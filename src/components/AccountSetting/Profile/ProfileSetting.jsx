import React from 'react';
import PropType from 'prop-types';
import Profile from './Profile';
import ProfileContextProvider from './ProfileContext';

const ProfileSetting = ({ setError }) => (
  <ProfileContextProvider setError={setError}>
    <Profile />
  </ProfileContextProvider>
);

ProfileSetting.propTypes = {
  setError: PropType.func.isRequired,
};


export default ProfileSetting;
