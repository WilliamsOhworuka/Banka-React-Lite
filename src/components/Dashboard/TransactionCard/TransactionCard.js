/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import HashLoader from 'react-spinners/HashLoader';
import DivItem from '../DivItem';
import getAllTransactions, { getAccountTransactions } from '../../../api/transaction';
import Search from '../Search/Search';
import Styles from './TransactionCard.module.scss';

const override = css`
    display: block;
    margin: 30px auto;
    border-color: red;
`;
const TransactionCard = ({
  all, accountNumber, transaction, setTransaction,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loader = (
    <HashLoader
      css={override}
      sizeUnit="px"
      size={50}
      color="#123abc"
      loading={loading}
    />
  );
  useEffect(() => {
    setLoading(true);
    if (all) {
      getAllTransactions(setTransaction, setLoading, setError);
    } else {
      getAccountTransactions(setTransaction, setLoading, accountNumber, setError);
    }
  }, [all]);

  const errorMessage = error ? (
    <div className={Styles.empty}>
      <p className={Styles.main}>An Error has occured</p>
      <p className={Styles.sub}>Could not fetch data from server</p>
    </div>
  ) : null;

  const empty = !loading && !error ? (
    <div className={Styles.empty}>
      <p className={Styles.main}>No transactions yet</p>
    </div>
  ) : errorMessage;

  return (
    <div className={Styles.card}>
      <div className={Styles.header}>
        <p>Activity</p>
        <div className={Styles.icons}>
          <Search />
          <i className={`fas fa-sort ${Styles.sort}`} />
        </div>
      </div>
      {loading ? loader : (
        <div className={Styles.body}>
          {transaction.length ? transaction.map((elem, index) => {
            const last = index === transaction.length - 1;
            return <DivItem last={last} content={elem} type="activity" Styles={Styles} />;
          }) : empty}
        </div>
      )}
    </div>
  );
};

TransactionCard.propTypes = {
  all: PropTypes.bool.isRequired,
  accountNumber: PropTypes.string,
  transaction: PropTypes.arrayOf(PropTypes.shape({
    accountnumber: PropTypes.number.isRequired,
  })),
  setTransaction: PropTypes.func.isRequired,
};

export default TransactionCard;
