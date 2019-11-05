/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Notify = ({
  title, content, Styles, setState, show,
}) => {
  useEffect(() => {
    setTimeout(() => setState(false), 9000);
  }, [show]);

  const handleClick = () => {
    setState(false);
  };
  return (
    <div className={show ? Styles.notify : `${Styles.notify} ${Styles.hide}`}>
      <button onClick={handleClick} className={Styles.close} type="button">x</button>
      <p className={Styles.title}>
        {title}
        <i className="fas fa-exclamation-triangle" />
      </p>
      <p className={Styles.content}>{content}</p>
    </div>
  );
};

Notify.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  Styles: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
};

export default Notify;
