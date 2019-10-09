import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../Navbar';
import LandingPage from '../LandingPage/LandingPage';
import HomeContextProvider from '../LandingPage/Hooks/LandingPageContext';

const Router = () => (
  <HomeContextProvider>
    <Navbar />
    <Switch>
      <Route exact path="/" component={LandingPage} />
    </Switch>
  </HomeContextProvider>
);

export default Router;
