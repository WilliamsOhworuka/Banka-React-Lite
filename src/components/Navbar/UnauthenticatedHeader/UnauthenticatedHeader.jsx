import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import windowSize from 'react-window-size';
import PropType from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Styles from './UnauthenticatedHeader.module.scss';
import Navlinks from '../../Navlinks/Navlinks';
import { HomeContext } from '../../LandingPage/Hooks/LandingPageContext';

const links = [
  {
    url: '#',
    text: 'About us',
    className: `col s1   ${Styles.borderless}`,
  },
  {
    url: '#',
    text: 'Contact us',
    className: `col s1   ${Styles.borderless}`,
  },
  {
    url: '#',
    text: 'Sign up',
    className: `col s1   ${Styles.fill} `,
  },
  {
    url: '#',
    text: 'Sign in',
    className: `col s1   ${Styles.border} `,
  },
];

const UnauthenticatedHeader = ({ windowWidth, history: { location: { pathname } } }) => {
  const { isOpen, handleClick } = useContext(HomeContext);
  const Navigation = windowWidth >= 1000 ? (
    <Navlinks
      elem={links}
      className={Styles.navlinks}
    />
  ) : <i className="fas fa-bars" role="presentation" onClick={handleClick} />;

  const navs = pathname === '/signup' ? (
    <div className={Styles.question}>
      {windowWidth > 450 ? <p>Already have an account?</p> : null}
      <a href="£">Log in</a>
    </div>
  ) : Navigation;

  return (
    <div className={isOpen && windowWidth < 1000 ? `${Styles.navbar} ${Styles.move}` : Styles.navbar}>
      <div className={Styles.logo}>
    Ban
        <span>ka</span>
      </div>
      {navs}
    </div>
  );
};

UnauthenticatedHeader.propTypes = {
  windowWidth: PropType.number.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(windowSize(UnauthenticatedHeader));
