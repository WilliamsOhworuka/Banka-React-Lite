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
    setState(e.target.innerText);
    setActive(false);
  };

  return (
    <div className={Styles.select}>
      <label htmlFor="dropdown">{type}</label>
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
                data-testid={option.text}
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
  type: PropType.string.isRequired,
};

export default Dropdown;
