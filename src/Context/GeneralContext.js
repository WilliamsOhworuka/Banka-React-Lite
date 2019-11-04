import React, { useState, createContext, useEffect } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import PropType from 'prop-types';

export const GeneralContext = createContext();
const GeneralContextProvider = ({ children, history }) => {
  const [user, setUser] = useState({});
  const [active, setActive] = useState(0);
  const [dash, setDash] = useState(true);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('Banka')));
  }, [history]);
  return (
    <GeneralContext.Provider value={{
      user,
      setUser,
      active,
      setActive,
      dash,
      setDash,
    }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

GeneralContextProvider.propTypes = {
  children: PropType.node.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(GeneralContextProvider);
