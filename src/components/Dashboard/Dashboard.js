import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import windowSize from 'react-window-size';
import Styles from './Dashboard.module.scss';
import { GeneralContext } from '../../Context/GeneralContext';
import AccountList from './AccountList/AccountList';
import AccountCard from './AccoundCard/AccountCard';
import MobileNav from './MobileNav/MobileNav';
import TransactionList from './TransactionCard/TransactionCard';


const Dashboard = ({ windowWidth }) => {
  const [accounts, setAccounts] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const { dash } = useContext(GeneralContext);

  return (
    <div className={Styles.container}>
      {windowWidth <= 425 ? <MobileNav /> : null}
      {dash ? (
        <div className={Styles.content}>
          <AccountList
            setTransaction={setTransaction}
            accounts={accounts}
            setAccounts={setAccounts}
          />
          <TransactionList all transaction={transaction} setTransaction={setTransaction} />
        </div>
      ) : (
        <div className={Styles.content}>
          <AccountCard accounts={accounts} />
          <TransactionList
            all={false}
            transaction={transaction}
            setTransaction={setTransaction}
            accountNumber={accounts.accountnumber}
          />
        </div>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  windowWidth: PropTypes.number.isRequired,
};

export default windowSize(Dashboard);
