import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import Styles from './Search.module.scss';

const Search = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className={Styles.search}>
      <button type="button" onClick={handleClick}>
        <i className="fas fa-search" />
      </button>
      <input className={open ? Styles.w : Styles.e} type="text" placeholder="Search Transactions" />
    </div>
  );
};

Search.propTypes = {

};

export default Search;
