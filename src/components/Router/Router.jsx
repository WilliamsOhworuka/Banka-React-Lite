import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../Navbar';
import LandingPage from '../LandingPage/LandingPage';
import Signup from '../Authentication/Signup/Signup';
import Signin from '../Authentication/Signin';
import HomeContextProvider from '../LandingPage/Hooks/LandingPageContext';
import GeneralContextProvider from '../../Context/GeneralContext';
import Dashboard from '../Dashboard/Dashboard';

const Router = () => (
  <GeneralContextProvider>
    <HomeContextProvider>
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </HomeContextProvider>
  </GeneralContextProvider>
);

export default Router;
