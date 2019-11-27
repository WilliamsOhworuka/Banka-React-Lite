/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState, useRef } from 'react';
import PropType from 'prop-types';
import Styles from './Dropdown.module.scss';

const Dropdown = ({
  defaultValue, setState, options, type,
}) => {
  const intervalRef = useRef();

  const [active, setActive] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleClick = () => {
    setActive(((prevState) => !prevState));
  };

  const handleBlur = () => {
    const timerId = setTimeout(() => setActive(false));
    intervalRef.current = timerId;
  };

  const handleFocus = () => {
    clearTimeout(intervalRef.current);
  };

  const handleSelect = (e) => {
    setValue(e.target.innerText);
    setState(e.target.getAttribute('data-id'));
    setActive(false);
  };

  return (
    <div className={Styles.select}>
      {type ? <label htmlFor="dropdown">{type}</label> : null}
      <div tabIndex="-1" className={Styles.dropContainer} onFocus={handleFocus} onBlur={handleBlur}>
        <div tabIndex="0" className={Styles.drop} id="dropdown" role="presentation" onClick={handleClick}>
          <p>{value}</p>
          <div>
            <i className="fas fa-angle-down" />
          </div>
        </div>
        {active ? (
          <ul className={Styles.options}>
            {options.map((option) => (
              <li
                role="presentation"
                onClick={handleSelect}
                data-id={option.value}
              >
                {option.text}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  defaultValue: PropType.string.isRequired,
  setState: PropType.func.isRequired,
  options: PropType.arrayOf(PropType.object).isRequired,
  type: PropType.string,
};

export default Dropdown;
