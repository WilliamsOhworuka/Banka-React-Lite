import React from 'react';
import { Switch } from 'react-router-dom';
import Navbar from '../Navbar';
import LandingPage from '../LandingPage/LandingPage';
import Signup from '../Authentication/Signup/Signup';
import Signin from '../Authentication/Signin';
import HomeContextProvider from '../LandingPage/Hooks/LandingPageContext';
import GeneralContextProvider from '../../Context/GeneralContext';
import Dashboard from '../Dashboard/Dashboard';
import Setting from '../AccountSetting';
import AccountDash from '../AccountPage/AccountDash';
import AccountForm from '../AccountForm/AccountForm';
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
        <Protected authenticated={false} exact path="/account" component={AccountDash} />
        <Protected authenticated={false} exact path="/setting" component={Setting} />
        <Protected authenticated={false} exact path="/new-account" component={AccountForm} />
      </Switch>
    </HomeContextProvider>
  </GeneralContextProvider>
);

export default Router;
