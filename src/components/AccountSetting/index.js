import React, { useState, useEffect, useContext } from 'react';
import ProfileSetting from './Profile/ProfileSetting';
import PasswordSetting from './Password/PasswordSetting';
import Notify from '../Notify/Notify';
import { GeneralContext } from '../../Context/GeneralContext';
import Styles from './AccountSetting.module.scss';

const AccountSetting = () => {
  const [error, setError] = useState('');
  const { setActive } = useContext(GeneralContext);
  useEffect(() => {
    setActive(1);
  }, []);

  return (
    <div className={Styles.container}>
      <Notify title="Account could not be updated:" content={error} show={error !== ''} Styles={Styles} setState={setError} />
      <ProfileSetting setError={setError} />
      <PasswordSetting setError={setError} />
    </div>
  );
};
AccountSetting.propTypes = {

};

export default AccountSetting;
