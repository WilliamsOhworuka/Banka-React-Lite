import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import { GeneralContext } from '../../Context/GeneralContext';
import Form from '../Form/Form';
import signinApiCall from '../../api/Signin';
import Styles from './auth.module.scss';

const fields = [
  {
    type: 'email',
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
  const [formData, setFormData] = useState(fields);
  const [resourceLoading, setResourceLoading] = useState(false);
  const [see, setSee] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(GeneralContext);

  useEffect(() => {
    setFormData((prevFormdata) => {
      const tempFormData = [...prevFormdata];
      tempFormData.forEach((field) => {
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
  };

  const toggleSee = () => {
    setSee((prevState) => !prevState);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setResourceLoading(true);
    signinApiCall(setError, formData, setResourceLoading, history, setUser);
  };

  return (
    <div className={Styles.container}>
      <Form
        elem={formData}
        className={Styles.form}
        title="Log in to your account"
        onChange={onChange}
        resourceLoading={resourceLoading}
        handleClick={handleClick}
        buttonText="Log in"
        toggle={toggleSee}
        see={see}
        error={error}
      />
      <a href="£">Forgot password?</a>
    </div>
  );
};

Signup.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(Signup);
