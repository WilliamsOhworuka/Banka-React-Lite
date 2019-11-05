import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Styles from '../Dashboard/Dashboard.module.scss';
import AccountCard from './AccoundCard/AccountCard';
import TransactionList from '../Dashboard/TransactionCard/TransactionCard';
import { GeneralContext } from '../../Context/GeneralContext';

const AccountDash = ({ history: { location: { search } } }) => {
  const [transaction, setTransaction] = useState([]);
  const accountNumber = new URLSearchParams(search).get('acctNo');
  const { setActive } = useContext(GeneralContext);
  useEffect(() => setActive(-1));

  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        <AccountCard accountNumber={accountNumber} />
        <TransactionList
          all={false}
          transaction={transaction}
          setTransaction={setTransaction}
          accountNumber={accountNumber}
        />
      </div>
    </div>
  );
};

export default withRouter(AccountDash);
