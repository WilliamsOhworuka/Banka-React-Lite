/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Grow from '@material-ui/core/Grow';

const Notify = ({
  title, content, Styles, setState, show,
}) => {
  useEffect(() => {
    setTimeout(() => setState(''), 5000);
  }, [show]);

  const handleClick = () => {
    setState('');
  };
  return (
    <Grow in={show}>
      <div className={Styles.notify}>
        <button onClick={handleClick} className={Styles.close} type="button"><i className="fas fa-times" /></button>
        <p className={Styles.title}>{title}</p>
        <p className={Styles.content}>{content}</p>
      </div>
    </Grow>
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
