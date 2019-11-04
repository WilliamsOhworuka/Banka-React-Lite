import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { GeneralContext } from '../../../Context/GeneralContext';
import Form from '../../Form/Form';
import validation from './validation';
import signupApiCall from '../../../api/Signup';
import Styles from '../auth.module.scss';

const fields = [
  {
    type: 'text',
    placeholder: 'First name',
    value: '',
    errorMessage: '',
  },
  {
    type: 'text',
    placeholder: 'Last name',
    value: '',
    errorMessage: '',
  },
  {
    type: 'text',
    placeholder: 'Email',
    value: '',
    errorMessage: '',
  },
  {
    type: 'password',
    placeholder: 'Password',
    value: '',
    errorMessage: '',
  },
];

const Signup = ({ history }) => {
  const { setUser } = useContext(GeneralContext);
  const [formData, setFormData] = useState(fields);
  const [resourceLoading, setResourceLoading] = useState(false);
  const [see, setSee] = useState(false);

  useEffect(() => {
    setFormData((prevFormdata) => {
      const tempFormData = [...prevFormdata];
      tempFormData.forEach((field) => {
        field.errorMessage = '';
        field.value = '';
      });
      return tempFormData;
    });
  }, []);

  const onChange = (event, index) => {
    const inputValue = event.target.value;
    setFormData((prevFormdata) => {
      const tempFormData = [...prevFormdata];
      tempFormData[index].value = inputValue;
      return tempFormData;
    });
    const { placeholder } = formData[index];
    validation(placeholder, inputValue, setFormData);
  };

  const toggleSee = () => {
    setSee((prevState) => !prevState);
  };

  const handleClick = (event) => {
    event.preventDefault();
    const errors = formData.find((field) => field.errorMessage);

    if (!errors) {
      setResourceLoading(true);
      signupApiCall(setFormData, formData, setResourceLoading, history, setUser);
    }
  };

  return (
    <div className={Styles.container}>
      <Form
        elem={formData}
        className={Styles.form}
        title="Start using Banka"
        authentication
        onChange={onChange}
        resourceLoading={resourceLoading}
        handleClick={handleClick}
        buttonText="CREATE ACCOUNT"
        toggle={toggleSee}
        see={see}
      />
    </div>
  );
};

Signup.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(Signup);
