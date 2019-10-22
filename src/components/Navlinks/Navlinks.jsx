/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropType from 'prop-types';

const Navlinks = ({ elem, className, icon }) => (
  <div className={className}>
    {icon}
    {elem.map((link) => (
      <a
        href={link.url}
        className={link.className}
        onClick={link.onClick || link.onClick}
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
  icon: PropType.node.isRequired,
  elem: PropType.arrayOf(PropType.object).isRequired,
};

export default Navlinks;
