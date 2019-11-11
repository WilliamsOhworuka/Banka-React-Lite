/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useContext, createContext, useState } from 'react';
import PropType from 'prop-types';
import { GeneralContext } from '../../../Context/GeneralContext';
import editFullname, { updateEmail } from '../../../api/edit';

export const ProfileContext = createContext();
const ProfileContextProvider = ({ setError, children }) => {
  const { user: { data: { firstName, lastName, email } }, setUser } = useContext(GeneralContext);
  const [controls, setControls] = useState({ fullname: false, email: false });
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState({ fullname: false, email: false });
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = useState('');
  const [formValues, setFormValues] = useState([
    {
      field: 'Firstname',
      value: firstName,
    },
    {
      field: 'Lastname',
      value: lastName,
    },
    {
      field: 'Email Address',
      value: email,
    },
  ]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e, index) => {
    const { target: { value }, target } = e;
    setFormValues((prev) => {
      const temp = [...prev];
      temp[index].value = value;
      return temp;
    });
    const field = target.id;

    if (field === 'Firstname') {
      const fullname = `${firstName} ${lastName}`;
      const test = `${value} ${lastName}`;
      setChange((prev) => ({ ...prev, fullname: fullname !== test }));
    } else if (field === 'Lastname') {
      const fullname = `${firstName} ${lastName}`;
      const test = `${firstName} ${value}`;
      setChange((prev) => ({ ...prev, fullname: fullname !== test }));
    } else {
      setChange((prev) => ({ ...prev, email: email !== value }));
    }
  };

  const handlePassChange = (e) => {
    const { target: { value } } = e;
    setPassword(value);
  };

  const handleEmailUpdate = (setLoad) => {
    const data = {
      email: formValues[2].value,
      password,
    };
    setLoad(true);
    updateEmail(setError, data, setLoad, setUser, handleClose, setControls);
  };

  const handleFocus = (field) => {
    if (field === 'Firstname' || field === 'Lastname') {
      setControls({
        fullname: true,
        email: change.email,
      });
    } else {
      setControls({
        fullname: change.fullname,
        email: true,
      });
    }
  };

  const handleSave = (e) => {
    const field = e.target.getAttribute('data-field');
    const data = {
      firstname: formValues[0].value,
      lastname: formValues[1].value,
      email: formValues[2].value,
    };
    setLoading(true);
    switch (field) {
      case 'fullname':
        editFullname(setError, data, setLoading, setUser);
        break;
      default:
    }
  };

  const handleCancel = (e) => {
    const field = e.target.getAttribute('data-field');
    switch (field) {
      case 'fullname':
        setFormValues((prev) => {
          const temp = [...prev];
          temp[0] = { ...temp[0], value: firstName };
          temp[1] = { ...temp[1], value: lastName };
          return temp;
        });
        setControls((prev) => ({ ...prev, fullname: false }));
        break;
      default:
        setFormValues((prev) => {
          const temp = [...prev];
          temp[2] = { ...temp[2], value: email };
          return temp;
        });
        setControls((prev) => ({ ...prev, email: false }));
    }
  };

  return (
    <ProfileContext.Provider value={{
      handleChange,
      handleOpen,
      handleCancel,
      handleFocus,
      handlePassChange,
      handleSave,
      handleEmailUpdate,
      open,
      controls,
      loading,
      change,
      formValues,
      handleClose,
      password,
    }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;

ProfileContextProvider.propTypes = {
  setError: PropType.func.isRequired,
  children: PropType.node.isRequired,
};
