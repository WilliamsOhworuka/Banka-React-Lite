import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../../AccountForm/Dropdown/Dropdown';
import Styles from './Filterbox.module.scss';

const defaultValue = (type, value) => {
  let option;
  if (type === 'sort') {
    switch (value) {
      case 'asc':
        option = 'Oldest';
        break;
      case 'desc':
        option = 'Newest';
        break;
      default:
    }
  } else if (type === 'filter') {
    switch (value) {
      case '':
        option = 'All';
        break;
      case 'credit':
        option = 'Credit';
        break;
      case 'debit':
        option = 'Debit';
        break;
      default:
    }
  }
  return option;
};
const Filterbox = React.forwardRef(({
  order, type, setType, setOrder, setFilter,
}, ref) => {
  const sortOptions = [{ text: 'Oldest', value: 'asc' }, { text: 'Newest', value: 'desc' }];
  const filterOptions = [{ text: 'All', value: '' }, { text: 'Debit', value: 'debit' }, { text: 'Credit', value: 'credit' }];

  const handleClick = (e) => {
    if (ref.current.contains(e.target)) {
      return;
    }
    setFilter(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false);
    return () => document.removeEventListener('mousedown', handleClick, false);
  }, []);

  const handleFilter = (value) => {
    setType(value);
  };

  return (
    <div className={Styles.filter}>
      <Dropdown options={filterOptions} defaultValue={defaultValue('filter', type)} setState={handleFilter} />
      <Dropdown options={sortOptions} defaultValue={defaultValue('sort', order)} setState={setOrder} />
    </div>
  );
});

Filterbox.propTypes = {

};

export default Filterbox;
