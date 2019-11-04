import React, { useContext } from 'react';
import { GeneralContext } from '../../../Context/GeneralContext';
import Navlinks from '../../Navlinks/Navlinks';
import Styles from './MobileNav.module.scss';

const links = [
  {
    url: '#',
    className: Styles.link1,
    text: 'Dashboard',
  },
  {
    url: '#',
    className: Styles.link2,
    text: 'Account Setting',
  },
];

const MobileNav = () => {
  const { active, setActive, setDash } = useContext(GeneralContext);
  const handleClick = (index) => {
    setDash(true);
    setActive(index);
  };
  return (
    <Navlinks
      elem={links}
      className={Styles.nav}
      active={active}
      handleClick={handleClick}
      activeClass={Styles.active}
    />
  );
};

MobileNav.propTypes = {

};

export default MobileNav;
