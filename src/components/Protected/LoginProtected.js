import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GeneralContext } from '../../Context/GeneralContext';

const LoginProtected = ({ authenticated, component: Component, path }) => {
  const { user } = useContext(GeneralContext);

  return (
    authenticated ? (
      <Route
        path={path}
        render={({ location, match }) => (
          Object.entries(user).length && user.constructor === Object
            ? <Redirect to={{ pathname: '/dashboard', state: { from: location } }} />
            : <Component match={match} />
        )}
      />
    ) : (
      <Route
        path={path}
        render={({ location, match }) => (
          Object.entries(user).length && user.constructor === Object
            ? <Component match={match} />
            : <Redirect to={{ pathname: '/signin', state: { from: location } }} />
        )}
      />
    )
  );
};

LoginProtected.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default LoginProtected;
