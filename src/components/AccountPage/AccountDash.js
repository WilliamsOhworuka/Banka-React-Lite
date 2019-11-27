import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';
import Styles from '../Dashboard/Dashboard.module.scss';
import AccountCard from './AccoundCard/AccountCard';
import TransactionList from '../Dashboard/TransactionCard/TransactionCard';
import { GeneralContext } from '../../Context/GeneralContext';
import TransactionContextProvider from '../Dashboard/TransactionCard/TransactionContext';

const AccountDash = ({ history: { location: { search } } }) => {
  const accountNumber = new URLSearchParams(search).get('acctNo');
  const { setActive } = useContext(GeneralContext);
  useEffect(() => setActive(-1), []);

  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        <AccountCard accountNumber={accountNumber} />
        <TransactionContextProvider
          all={false}
          accountNumber={accountNumber}
        >
          <TransactionList />
        </TransactionContextProvider>
      </div>
    </div>
  );
};

AccountDash.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};


export default withRouter(AccountDash);
