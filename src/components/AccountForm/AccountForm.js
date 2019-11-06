/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useContext } from 'react';
import { css } from '@emotion/core';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import PulseLoader from 'react-spinners/PulseLoader';
import { GeneralContext } from '../../Context/GeneralContext';
import Dropdown from './Dropdown/Dropdown';
import validate from './validate';
import { createAccount } from '../../api/account';
import Notify from '../Notify/Notify';
import Styles from './AccountForm.module.scss';

const options = [{ text: 'Savings', value: 'Savings' }, { text: 'Current', value: 'Current' }];
const { 0: { value: defaultValue } } = options;

const override = css`
    display: block;
    margin: 0;
`;
const Account = ({ history }) => {
  const [selected, setSelected] = useState(defaultValue);
  const [values, setValues] = useState({ accountName: null, type: selected });
  const [error, setError] = useState(null);
  const [ajaxError, setAjaxError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setActive, setGenAccount } = useContext(GeneralContext);

  useEffect(() => {
    setActive(-1);
  }, []);

  const loader = (
    <PulseLoader
      css={override}
      sizeUnit="px"
      size={10}
      color="white"
      loading={loading}
    />
  );

  useEffect(() => {
    setValues((prev) => {
      const temp = { ...prev };
      return { ...temp, type: selected };
    });
  }, [selected]);

  const handleChange = (e) => {
    const { value } = e.target;
    setValues((prev) => {
      const temp = { ...prev, accountName: value };
      validate(temp.accountName, setError);
      return temp;
    });
  };

  const handleClick = () => {
    setLoading(true);
    createAccount(setLoading, values, setAjaxError, history, setGenAccount);
  };

  const disable = !!(loading || error);
  const errorClass = error ? Styles.error : Styles.input;

  return (
    <div className={Styles.container}>
      <Notify Styles={Styles} setState={setAjaxError} show={ajaxError} title="Network Error" content="Could not create account, check connection and try again" />
      <div className={Styles.header}>Create New Account</div>
      <div className={Styles.body}>
        <form className={Styles.form}>
          <label htmlFor="name">Account name</label>
          <input className={errorClass} type="text" id="name" placeholder="Account name" onChange={(e) => handleChange(e)} />
          <span>{error}</span>
          <Dropdown options={options} type="Account type" setState={setSelected} defaultValue={selected} />
          <button disabled={disable} type="submit" onClick={handleClick}>{loading ? loader : 'Create account'}</button>
        </form>
      </div>
    </div>
  );
};

Account.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(Account);
