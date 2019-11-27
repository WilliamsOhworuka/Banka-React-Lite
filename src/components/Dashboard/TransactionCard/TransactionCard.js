import React, { useContext } from 'react';
import DivItem from '../DivItem';
import Search from '../Search/Search';
import Filter from './Filterbox/Filterbox';
import { TransactionContext } from './TransactionContext';
import Styles from './TransactionCard.module.scss';

const TransactionCard = () => {
  const {
    type, setSearch, setTransaction, all, accountNumber, setLoading, setError,
    order, setMore, setNext, ref, handleClick, filter, setOrder, transaction,
    setType, setFilter, scrollRef, empty, show, moreButton, loading,
  } = useContext(TransactionContext);
  return (
    <div className={Styles.card}>
      <div className={Styles.header}>
        <p>Activity</p>
        <div className={Styles.icons}>
          <Search
            type={type}
            setSearch={setSearch}
            setTransaction={setTransaction}
            all={all}
            accountNumber={accountNumber}
            setLoading={setLoading}
            setError={setError}
            order={order}
            setMore={setMore}
            setNext={setNext}
          />
          <div className={Styles.filterBox} ref={ref}>
            <button
              aria-label="filter"
              onClick={handleClick}
              type="button"
              className={Styles.sort}
            >
              <i className="fas fa-sort " />
            </button>
            {filter ? (
              <Filter
                order={order}
                type={type}
                setType={setType}
                setFilter={setFilter}
                setOrder={setOrder}
                ref={ref}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div className={Styles.body} ref={scrollRef}>
        {transaction.length && !loading ? transaction.map((elem, index) => {
          const last = index === transaction.length - 1;
          return <DivItem last={last} content={elem} type="activity" Styles={Styles} />;
        }) : empty}
      </div>
      {show ? moreButton : null}
    </div>
  );
};

export default TransactionCard;
