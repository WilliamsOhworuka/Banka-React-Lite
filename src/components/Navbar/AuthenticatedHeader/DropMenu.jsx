import React, { useContext } from 'react';
import { GeneralContext } from '../../../Context/GeneralContext';
import Styles from './AuthenticatedHeader.module.scss';

const DropMenu = () => {
  const { user: { data: { firstName, lastName, email } } } = useContext(GeneralContext);
  const fullname = `${firstName} ${lastName}`;

  return (
    <div className={Styles.dropdown}>
      <div className={Styles.dropItem1}>
        <i className={`fas fa-user-secret ${Styles.profile}`} />
        <p className={Styles.name}>{fullname}</p>
        <p className={Styles.email}>{email}</p>
      </div>
      <div className={Styles.dropItem2}>
        <i className="fas fa-sliders-h" />
        <span>Account Setting</span>
      </div>
      <div className={Styles.dropItem3}>
        <i className="far fa-bell" />
        <span>Notification</span>
      </div>
      <div className={Styles.dropItem4}>
        <i className="fas fa-sign-out-alt" />
        <span>Sign out</span>
      </div>
    </div>
  );
};

export default DropMenu;
