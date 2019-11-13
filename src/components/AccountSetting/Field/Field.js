/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import Styles from './Field.module.scss';

const Field = ({
  handleChange, value, field, index, handleFocus, type,
}) => (
  <div className={Styles.inputContainer}>
    <label htmlFor={field}>{field}</label>
    <input
      type={type}
      onFocus={handleFocus ? () => handleFocus(field) : () => {}}
      onChange={(e) => handleChange(e, index)}
      className={Styles.input}
      id={field}
      value={value}
    />
  </div>
);

Field.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
  index: PropTypes.number,
  handleFocus: PropTypes.func,
};

export default Field;
