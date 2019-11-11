import React, { useState, createContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropType from 'prop-types';

export const GeneralContext = createContext();
const GeneralContextProvider = ({ children }) => {
  const [active, setActive] = useState(-1);
  const [dash, setDash] = useState(true);
  const [genAccount, setGenAccount] = useState(null);
  const localState = JSON.parse(localStorage.getItem('Banka'));
  const [user, setUser] = useState(localState || {});

  useEffect(() => {
    localStorage.setItem('Banka', JSON.stringify(user));
  }, [user]);

  return (
    <GeneralContext.Provider value={{
      user,
      setUser,
      active,
      setActive,
      dash,
      setDash,
      genAccount,
      setGenAccount,
    }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

GeneralContextProvider.propTypes = {
  children: PropType.node.isRequired,
};

export default withRouter(GeneralContextProvider);
