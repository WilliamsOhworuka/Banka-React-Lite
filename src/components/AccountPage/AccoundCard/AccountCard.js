import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import HashLoader from 'react-spinners/HashLoader';
import { GeneralContext } from '../../../Context/GeneralContext';
import { getAccount } from '../../../api/account';
import Message from '../../helpers/Message';
import Styles from './AccountCard.module.scss';

const AccountCard = ({ accountNumber }) => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { genAccount } = useContext(GeneralContext);
  const override = css`
    display: block;
    margin: 30px 130px;
    border-color: red;
`;

  const loader = (
    <HashLoader
      css={override}
      sizeUnit="px"
      size={50}
      color="#123abc"
      loading={loading}
    />
  );

  const errorMessage = error ? (
    <Message
      Styles={Styles}
      title="An Error has occured"
      text="Could not fetch data from server"
    />
  ) : null;

  const empty = !loading && !error ? (
    <Message
      Styles={Styles}
      title="Account not found"
      text="Could not find an account with that account number"
    />
  ) : errorMessage;

  useEffect(() => {
    if (!genAccount) {
      getAccount(setLoading, setAccount, setError, accountNumber);
    } else {
      setLoading(false);
    }
  }, []);
  const acct = genAccount || account;

  const content = acct ? (
    <>
      <div className={Styles.left}>
        <p className={Styles.acctno}>{acct.accountnumber}</p>
        <p className={Styles.save}>{acct.type}</p>
        <p className={Styles.sub}>{acct.accountname}</p>
      </div>
      <div className={Styles.right}>
        <p className={Styles.bal}>{`\u20A6${acct.balance}`}</p>
        <p className={Styles.sub}>{acct.status}</p>
      </div>
    </>
  ) : empty;

  return (
    <div className={Styles.card}>
      {loading ? loader : content}
    </div>
  );
};

AccountCard.propTypes = {
  accountNumber: PropTypes.string.isRequired,
};

export default AccountCard;
