import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import getTransactions, { getAccountTransactions } from '../../../api/transaction';
import Styles from './Search.module.scss';

const Search = ({
  type, setTransaction, accountNumber, setSearch,
  setLoading, setError, order, setMore, setNext, total,
}) => {
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { target: { value } } = e;
    setSearch(value);
    getTransactions(setTransaction, setLoading, accountNumber,
      setError, value, null, order, type, setMore, setNext);
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={Styles.search}>
      <button type="button" onClick={handleClick}>
        <i className="fas fa-search" />
      </button>
      <input onChange={(e) => handleChange(e)} className={open ? Styles.w : Styles.e} type="text" placeholder="Search Transactions" />
    </div>
  );
};

Search.propTypes = {

};

export default Search;
