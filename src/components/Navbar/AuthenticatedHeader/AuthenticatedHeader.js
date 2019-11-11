/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState, useRef, useContext } from 'react';
import windowSize from 'react-window-size';
import PropType from 'prop-types';
import { GeneralContext } from '../../../Context/GeneralContext';
import Styles from './AuthenticatedHeader.module.scss';
import Navlinks from '../../Navlinks/Navlinks';
import DropMenu from './DropMenu';

const links = [
  {
    url: '/dashboard',
    text: 'Dashboard',
    className: `col s1   ${Styles.links} `,
  },
  {
    url: '/setting',
    text: 'Account Setting',
    className: `col s1   ${Styles.links} `,
  },
];

const AuthenticatedHeader = ({ windowWidth }) => {
  const { active } = useContext(GeneralContext);
  const [show, setShow] = useState(false);
  const intervalRef = useRef();

  const toggleDrop = () => {
    const timerId = setTimeout(() => setShow((prev) => !prev));
    intervalRef.current = timerId;
  };

  const handleFocus = () => {
    clearTimeout(intervalRef.current);
  };

  return (
    <div className={Styles.dashNav}>
      <a className={Styles.logo} href="/">
    Ban
        <span>ka</span>
      </a>
      {windowWidth > 500 ? (
        <Navlinks
          elem={links}
          active={active}
          className={Styles.dashLinks}
          activeClass={Styles.active}
        />
      ) : null}
      <div className={Styles.icon} tabIndex="0" onFocus={handleFocus} onBlur={() => setShow(false)}>
        <button className={Styles.avater} type="button"><i onClick={toggleDrop} role="presentation" className="fas fa-user-secret" /></button>
        <i className={`fas fa-angle-down ${Styles.drop}`} />
        {show ? <DropMenu /> : null}
      </div>
    </div>
  );
};

AuthenticatedHeader.propTypes = {
  windowWidth: PropType.number.isRequired,
};

export default windowSize(AuthenticatedHeader);
