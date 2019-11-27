import React, {
  useState, useEffect, useRef, createContext,
} from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { HashLoader, PulseLoader } from 'react-spinners';
import Message from '../../helpers/Message';
import getTransactions from '../../../api/transaction';
import Styles from './TransactionCard.module.scss';

export const TransactionContext = createContext();

const override = css`
    display: block;
    margin: 30px auto;
    border-color: red;
`;

const buttonOverride = css`
    display: block;
    margin: auto;
`;
const TransactionContextProvider = ({ all, accountNumber = '', children }) => {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState(false);
  const [order, setOrder] = useState('desc');
  const [type, setType] = useState('');
  const [more, setMore] = useState(false);
  const [show, setShow] = useState(false);
  const [next, setNext] = useState();
  const [moreLoading, setMoreLoading] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef();
  const scrollRef = useRef();

  const handleClick = () => {
    setFilter((prev) => !prev);
  };

  const loader = (
    <HashLoader
      css={override}
      sizeUnit="px"
      size={50}
      color="#123abc"
      loading={loading}
    />
  );

  const buttonLoader = (
    <PulseLoader
      css={buttonOverride}
      sizeUnit="px"
      size={5}
      color="white"
      loading={moreLoading}
    />
  );

  const loadMore = () => {
    const accountNo = accountNumber || null;
    setMoreLoading(true);
    setTimeout(() => getTransactions(setTransaction, setMoreLoading, accountNo, setError,
      search, next, order, type, setMore, setNext), 2000);
  };

  useEffect(() => {
    setLoading(true);
    const accountNo = accountNumber || null;
    getTransactions(setTransaction, setLoading, accountNo, setError,
      null, null, order, type, setMore, setNext);
  }, [all, order, type]);

  useEffect(() => {
    const body = scrollRef.current;
    body.addEventListener('scroll', () => {
      const bottom = Math.ceil(body.scrollTop) >= body.scrollHeight - body.offsetHeight;
      setShow(bottom);
    });
  }, []);

  const moreButton = more ? (
    <button
      onClick={loadMore}
      disabled={moreLoading}
      type="button"
      className={Styles.more}
    >
      {moreLoading ? buttonLoader : 'Load more'}
    </button>
  ) : null;

  const errorMessage = error && !loading ? (
    <Message
      Styles={Styles}
      title="An Error has occured"
      text="Could not fetch data from server"
    />
  ) : loader;


  const empty = !loading && !error ? (
    <Message
      Styles={Styles}
      title="No transactions yet"
      text=""
    />
  ) : errorMessage;

  return (
    <TransactionContext.Provider value={{
      empty,
      all,
      errorMessage,
      scrollRef,
      loading,
      moreButton,
      loadMore,
      buttonLoader,
      loader,
      handleClick,
      ref,
      accountNumber,
      show,
      order,
      setTransaction,
      setError,
      setSearch,
      setOrder,
      setType,
      setLoading,
      setFilter,
      filter,
      transaction,
      type,
    }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

TransactionContextProvider.propTypes = {
  all: PropTypes.bool.isRequired,
  accountNumber: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default TransactionContextProvider;
