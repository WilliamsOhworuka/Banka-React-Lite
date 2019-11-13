/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useContext } from 'react';
import { css } from '@emotion/core';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import Messsage from '../../helpers/Message';
import { GeneralContext } from '../../../Context/GeneralContext';
import DivItem from '../DivItem';
import accountApi from '../../../api/account';
import Styles from './AccountList.module.scss';

const AccountList = ({ history }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { setActive } = useContext(GeneralContext);

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
    const accountNumber = accounts[index].accountnumber;
    setActive(-1);
    history.push(`/account?acctNo=${accountNumber}`);
  };

  const createAccount = () => {
    history.push('/new-account');
  };

  useEffect(() => {
    accountApi(setAccounts, setLoading, setError);
  }, []);

  const errorMessage = error ? (
    <Messsage
      Styles={Styles}
      text="An Error has occured"
      title="Could not fetch data from server"
    />
  ) : null;

  const empty = !loading && !error ? (
    <Messsage
      Styles={Styles}
      text="No Accounts"
      title="Click on the + button above to add account"
    />
  ) : errorMessage;

  return (
    <div className={Styles.card}>
      <div className={Styles.header}>
        <p>Accounts</p>
        <button type="button" onClick={createAccount}><i role="presentation" className="fas fa-plus" /></button>
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
  history: ReactRouterPropTypes.history.isRequired,
};

export default withRouter(AccountList);
