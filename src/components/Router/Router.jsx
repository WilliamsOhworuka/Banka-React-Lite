import React from 'react';
import { Switch } from 'react-router-dom';
import Navbar from '../Navbar';
import LandingPage from '../LandingPage/LandingPage';
import Signup from '../Authentication/Signup/Signup';
import Signin from '../Authentication/Signin';
import HomeContextProvider from '../LandingPage/Hooks/LandingPageContext';
import GeneralContextProvider from '../../Context/GeneralContext';
import Dashboard from '../Dashboard/Dashboard';
import Protected from '../Protected/LoginProtected';

const Router = () => (
  <GeneralContextProvider>
    <HomeContextProvider>
      <Navbar />
      <Switch>
        <Protected authenticated exact path="/" component={LandingPage} />
        <Protected authenticated exact path="/signup" component={Signup} />
        <Protected authenticated exact path="/signin" component={Signin} />
        <Protected authenticated={false} exact path="/dashboard" component={Dashboard} />
      </Switch>
    </HomeContextProvider>
  </GeneralContextProvider>
);

export default Router;
