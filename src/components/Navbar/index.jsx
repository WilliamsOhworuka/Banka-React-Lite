import React, { useContext } from 'react';
import windowSize from 'react-window-size';
import { GeneralContext } from '../../Context/GeneralContext';
import MobileNav from './MobileNav/MobileNav';
import UnauthenticatedHeader from './UnauthenticatedHeader/UnauthenticatedHeader';
import AuthenticatedHeader from './AuthenticatedHeader/AuthenticatedHeader';

const Navbar = ({ windowWidth }) => {
  const { user } = useContext(GeneralContext);

  return user && Object.entries(user).length && user.constructor === Object ? (
    <>
      <AuthenticatedHeader />
      { windowWidth < 500 ? <MobileNav /> : null}
    </>
  ) : <UnauthenticatedHeader />;
};


export default windowSize(Navbar);
