import React, { useContext, useEffect } from 'react';
import Styles from './Dashboard.module.scss';
import { GeneralContext } from '../../Context/GeneralContext';
import AccountList from './AccountList/AccountList';
import TransactionList from './TransactionCard/TransactionCard';

const Dashboard = () => {
  const { setActive } = useContext(GeneralContext);

  useEffect(() => {
    setActive(0);
  }, []);

  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        <AccountList />
        <TransactionList all />
      </div>
    </div>
  );
};

export default Dashboard;
