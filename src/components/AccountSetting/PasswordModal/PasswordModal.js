/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { css } from '@emotion/core';
import PulseLoader from 'react-spinners/PulseLoader';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Styles from './Password.module.scss';
import Field from '../Field/Field';

const override = css`
    display: block;
    margin: 0;
`;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  paper: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    marginTop: '50px',
    border: '2px solid rgba(0,0,0,0.08)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '3px',
    outline: 'none',
    fontFamily: "'Open Sans', sans-serif",
  },
}));

export default function TransitionsModal({
  handleSubmit, handleClose, handleChange, open, password,
}) {
  const [load, setLoad] = useState(false);
  const classes = useStyles();
  const loader = (
    <PulseLoader
      css={override}
      sizeUnit="px"
      size={6}
      color="white"
      loading={load}
    />
  );
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <button onClick={handleClose} className={Styles.close} type="button"><i className="fas fa-times" /></button>
            <h6 className={Styles.header} id="transition-modal-title">Update Email</h6>
            <Field
              type="password"
              field="To update email, enter your current password"
              handleChange={handleChange}
            />
            <button onClick={() => handleSubmit(setLoad)} className={Styles.button} type="submit" disabled={password === ''}>{load ? loader : 'Update Email'}</button>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
