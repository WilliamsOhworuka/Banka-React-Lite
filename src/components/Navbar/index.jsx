import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import windowSize from 'react-window-size';
import MobileNav from './MobileNav/MobileNav';
import UnauthenticatedHeader from './UnauthenticatedHeader/UnauthenticatedHeader';
import AuthenticatedHeader from './AuthenticatedHeader/AuthenticatedHeader';

const Navbar = ({ history, windowWidth }) => {
  let user = JSON.parse(localStorage.getItem('Banka'));
  useEffect(() => {
    user = JSON.parse(localStorage.getItem('Banka'));
  }, [history]);

  return user ? (
    <>
      <AuthenticatedHeader />
      { windowWidth < 500 ? <MobileNav /> : null}
    </>
  ) : <UnauthenticatedHeader />;
};


export default windowSize(withRouter(Navbar));
