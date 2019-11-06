/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ Styles, title, text }) => (
  <div className={Styles.empty}>
    <p className={Styles.main}>{title}</p>
    <p className={Styles.sub}>{text}</p>
  </div>
);

Message.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  Styles: PropTypes.object.isRequired,
};

export default Message;
