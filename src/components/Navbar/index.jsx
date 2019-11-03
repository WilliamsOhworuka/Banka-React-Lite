import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import UnauthenticatedHeader from './UnauthenticatedHeader/UnauthenticatedHeader';
import AuthenticatedHeader from './AuthenticatedHeader/AuthenticatedHeader';

const Navbar = ({ history }) => {
  let user = JSON.parse(localStorage.getItem('Banka'));
  useEffect(() => {
    user = JSON.parse(localStorage.getItem('Banka'));
  }, [history]);

  return user ? <AuthenticatedHeader /> : <UnauthenticatedHeader />;
};


export default withRouter(Navbar);
