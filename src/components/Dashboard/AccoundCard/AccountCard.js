import React from 'react';
import PropTypes from 'prop-types';
import Styles from './AccountCard.module.scss';

const AccountCard = ({ accounts }) => {
  const {
    accountnumber, type,
    accountname, balance, status,
  } = accounts;
  return (
    <div className={Styles.card}>
      <div className={Styles.left}>
        <p className={Styles.acctno}>{accountnumber}</p>
        <p className={Styles.save}>{type}</p>
        <p className={Styles.sub}>{accountname}</p>
      </div>
      <div className={Styles.right}>
        <p className={Styles.bal}>{`\u20A6${balance}`}</p>
        <p className={Styles.sub}>{status}</p>
      </div>
    </div>
  );
};

AccountCard.propTypes = {
  accounts: PropTypes.shape({
    type: PropTypes.string.isRequired,
    accountname: PropTypes.string.isRequired,
    accountnumber: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }).isRequired,
};

export default AccountCard;
