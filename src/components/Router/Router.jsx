import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../Navbar';
import LandingPage from '../LandingPage/LandingPage';
import Signup from '../Authentication/Signup/Signup';
import Signin from '../Authentication/Signin';
import HomeContextProvider from '../LandingPage/Hooks/LandingPageContext';

const Router = () => (
  <HomeContextProvider>
    <Navbar />
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
    </Switch>
  </HomeContextProvider>
);

export default Router;
