import React, { useContext } from 'react';
import { css } from '@emotion/core';
import PulseLoader from 'react-spinners/PulseLoader';
import Field from '../Field/Field';
import { ProfileContext } from './ProfileContext';
import PasswordModal from '../PasswordModal/PasswordModal';
import Styles from '../AccountSetting.module.scss';

const override = css`
    display: block;
    margin: 0;
`;

const Profile = () => {
  const {
    handleChange, handleOpen, handleCancel, handleFocus, handlePassChange, password,
    handleSave, handleEmailUpdate, open, controls, loading, change, formValues, handleClose,
  } = useContext(ProfileContext);

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
    <section className={Styles.profile}>
      <PasswordModal
        password={password}
        handleSubmit={handleEmailUpdate}
        handleChange={handlePassChange}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <aside className={Styles.prinfo}>
        <h6>Profile</h6>
        <p>Your email is your identity and it  must be unique</p>
      </aside>
      <form className={Styles.prform}>
        <div className={Styles.fullname}>
          {formValues.map((item, index) => (index < 2 ? (
            <Field
              type="text"
              field={item.field}
              value={item.value}
              index={index}
              handleChange={handleChange}
              handleFocus={handleFocus}
            />
          ) : null))}
          {controls.fullname ? (
            <div className={Styles.control}>
              <button
                className={Styles.save}
                data-field="fullname"
                onClick={(e) => handleSave(e)}
                type="button"
                disabled={!change.fullname}
              >
                {loading ? loader : 'Save'}
              </button>
              <button className={Styles.cancel} data-field="fullname" onClick={(e) => handleCancel(e)} type="button">Cancel</button>
            </div>
          ) : null}
        </div>
        <div className={Styles.email}>
          <Field
            type="text"
            field={formValues[2].field}
            value={formValues[2].value}
            index={2}
            handleChange={handleChange}
            handleFocus={handleFocus}
          />
          {controls.email ? (
            <div className={Styles.control}>
              <button
                data-field="email"
                className={Styles.save}
                form="email"
                type="button"
                disabled={!change.email}
                onClick={handleOpen}
              >
                {loading ? loader : 'Save'}
              </button>
              <button className={Styles.cancel} data-field="email" form="email" onClick={(e) => handleCancel(e)} type="button">Cancel</button>
            </div>
          ) : null}
        </div>
      </form>
    </section>
  );
};

Profile.propTypes = {

};

export default Profile;
