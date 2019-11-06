/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState, useRef, useContext } from 'react';
import windowSize from 'react-window-size';
import { withRouter } from 'react-router-dom';
import PropType from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
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
    url: '#',
    text: 'Account Setting',
    className: `col s1   ${Styles.links} `,
  },
];

const AuthenticatedHeader = ({ history, windowWidth }) => {
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
      <div className={Styles.logo} role="presentation" onClick={() => history.push('/')}>
    Ban
        <span>ka</span>
      </div>
      {windowWidth > 500 ? (
        <Navlinks
          elem={links}
          active={active}
          className={Styles.dashLinks}
          activeClass={Styles.active}
        />
      ) : null}
      <div className={Styles.icon} tabIndex="0" onFocus={handleFocus} onBlur={() => setShow(false)}>
        <i onClick={toggleDrop} role="presentation" className={`fas fa-user-secret ${Styles.avater}`} />
        <i className={`fas fa-angle-down ${Styles.drop}`} />
        {show ? <DropMenu /> : null}
      </div>
    </div>
  );
};

AuthenticatedHeader.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  windowWidth: PropType.number.isRequired,
};

export default windowSize(withRouter(AuthenticatedHeader));
