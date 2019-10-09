import React, { useContext } from 'react';
import windowSize from 'react-window-size';
import PropType from 'prop-types';
import Sidebar from './Sidebar/Sidebar';
import { HomeContext } from './Hooks/LandingPageContext';
import Styles from './LandingPage.module.scss';

const LandingPage = ({ windowWidth }) => {
  const { isOpen } = useContext(HomeContext);
  return (
    <>
      <div className={isOpen && windowWidth < 1000 ? `${Styles.landingPage} ${Styles.move}` : Styles.landingPage}>
        <section>
          <h3>Need to open a bank account?</h3>
          <h5>Banka has got you covered</h5>
          <p>
        Open an account and have express access to your account information and a
      detailed transaction history at your convenience
          </p>
        </section>
        <a href="£" className={Styles.register}>Get Started</a>
      </div>
      {windowWidth < 1000 ? <Sidebar /> : null}
    </>
  );
};

LandingPage.propTypes = {
  windowWidth: PropType.number.isRequired,
};

export default windowSize(LandingPage);
