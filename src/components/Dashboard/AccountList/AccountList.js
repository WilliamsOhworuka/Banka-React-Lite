import React, { useState, useEffect, useContext } from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import HashLoader from 'react-spinners/HashLoader';
import { GeneralContext } from '../../../Context/GeneralContext';
import DivItem from '../DivItem';
import accountApi from '../../../api/account';
import Styles from './AccountList.module.scss';

const AccountList = ({ accounts, setAccounts, setTransaction }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { setActive, setDash } = useContext(GeneralContext);

  const override = css`
    display: block;
    margin: 30px auto;
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

  const handleClick = (index) => {
    setActive(-1);
    setAccounts((prev) => prev[index]);
    setTransaction([]);
    setDash(false);
  };

  useEffect(() => {
    accountApi(setAccounts, setLoading, setError);
  }, []);

  const errorMessage = error ? (
    <div className={Styles.empty}>
      <p className={Styles.main}>An Error has occured</p>
      <p className={Styles.sub}>Could not fetch data from server</p>
    </div>
  ) : null;

  const empty = !loading && !error ? (
    <div className={Styles.empty}>
      <p className={Styles.main}>No Accounts</p>
      <p className={Styles.sub}>Click on the + button above to add account</p>
    </div>
  ) : errorMessage;

  return (
    <div className={Styles.card}>
      <div className={Styles.header}>
        <p>Accounts</p>
        <i className="fas fa-plus" />
      </div>
      {loading ? loader : (
        <div className={Styles.body}>
          {accounts.length ? accounts.map((elem, index) => {
            const first = index === 0;
            return (
              <DivItem
                first={first}
                handleClick={handleClick}
                key={elem.id}
                index={index}
                content={elem}
                type="account"
                Styles={Styles}
              />
            );
          }) : empty}
        </div>
      )}
    </div>
  );
};

AccountList.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    accountnumber: PropTypes.number.isRequired,
  })).isRequired,
  setAccounts: PropTypes.func.isRequired,
  setTransaction: PropTypes.func.isRequired,
};

export default AccountList;
