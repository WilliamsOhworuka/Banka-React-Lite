import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../Navbar';
import LandingPage from '../LandingPage/LandingPage';
import Signup from '../Signup/Signup';
import HomeContextProvider from '../LandingPage/Hooks/LandingPageContext';

const Router = () => (
  <HomeContextProvider>
    <Navbar />
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  </HomeContextProvider>
);

export default Router;
