/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react';
import { css } from '@emotion/core';
import PropType from 'prop-types';
import PulseLoader from 'react-spinners/PulseLoader';
import Field from '../Field/Field';
import Styles from '../AccountSetting.module.scss';
import { updatePassword } from '../../../api/edit';

const override = css`
    display: block;
    margin: 0;
`;

const PasswordSetting = ({ setError }) => {
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState('');
  const [success, setSuccess] = useState(false);
  const [emptyField, setEmptyField] = useState(true);
  const [formValues, setFormValues] = useState({
    CurrentPassword: '',
    NewPassword: '',
    confirm: '',
  });

  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormValues((prev) => ({ ...prev, [field]: value }));
    const { NewPassword, confirm } = formValues;
    if (field === 'confirm' && NewPassword !== '') {
      const condition = value !== NewPassword ? 'Password do not match' : '';
      setErr(condition);
    } else if (field === 'NewPassword' && confirm !== '') {
      const condition = value !== confirm ? 'Password do not match' : '';
      setErr(condition);
    }
    const noEmpty = Object.values(formValues).every((val) => val !== '');
    if (!noEmpty) {
      setEmptyField(true);
    } else {
      setEmptyField(false);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    updatePassword(setError, formValues, setLoading, setSuccess);
  };

  const handleFocus = () => {
    setErr('');
    setSuccess(false);
  };

  const loader = (
    <PulseLoader
      css={override}
      sizeUnit="px"
      size={6}
      color="white"
      loading={loading}
    />
  );

  return (
    <section className={`${Styles.profile} ${Styles.pass}`}>
      <aside className={Styles.prinfo}>
        <h6>Password</h6>
        <p>Your Password must be six charcaters long at least and alphanumeric</p>
      </aside>
      <form className={Styles.pform}>
        {error || success
          ? (
            <div className={!error ? Styles.success : Styles.error}>
              {error ? (
                <>
                  <i className="fas fa-exclamation-triangle" />
                  {' '}
                  {error}
                </>
              ) : (
                <>
                  <i className="far fa-check-circle" />
                  {' '}
                  Password successfully Changed
                </>
              )}
            </div>
          ) : null}
        <Field handleFocus={handleFocus} handleChange={handleChange} index="CurrentPassword" type="password" field="Current Password" />
        <Field handleFocus={handleFocus} handleChange={handleChange} index="NewPassword" type="password" field="New Password" />
        <Field handleFocus={handleFocus} handleChange={handleChange} index="confirm" type="password" field="Confirm New Password" />
        <button disabled={error || loading || emptyField} onClick={handleSubmit} className={Styles.button} type="button">{loading ? loader : 'Update Password'}</button>
      </form>
    </section>
  );
};

PasswordSetting.propTypes = {
  setError: PropType.func.isRequired,
};

export default PasswordSetting;
