/* eslint-disable react/require-default-props */
import React from 'react';
import PropType from 'prop-types';

const Navlinks = ({
  elem, className, active, handleClick, activeClass,
}) => (
  <div className={className}>
    {elem.map((link, index) => (
      <a
        href={link.url}
        className={index === active ? `${link.className} ${activeClass}` : link.className}
        onClick={handleClick ? (e) => handleClick(index, e) : null}
        id={link.text}
        key={link.text}
      >
        {link.text}
      </a>
    ))}
  </div>
);

Navlinks.propTypes = {
  className: PropType.string.isRequired,
  active: PropType.number,
  activeClass: PropType.string,
  handleClick: PropType.func,
  elem: PropType.arrayOf(PropType.object).isRequired,
};

export default Navlinks;
