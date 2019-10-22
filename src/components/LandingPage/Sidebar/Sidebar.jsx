import React, { useContext } from 'react';
import Navlinks from '../../Navlinks/Navlinks';
import { HomeContext } from '../Hooks/LandingPageContext';
import Styles from './Sidebar.module.scss';

const links = [
  {
    url: 'signup',
    text: 'Sign up',
    className: Styles.fill,
  },
  {
    url: '#',
    text: 'About us',
    className: Styles.norm,
  },
  {
    url: '#',
    text: 'Contact us',
    className: Styles.norm,
  },
  {
    url: '/signin',
    text: 'Log in',
    className: Styles.norm,
  },
];

const Sidebar = () => {
  const { isOpen, handleClick } = useContext(HomeContext);
  return (
    <Navlinks elem={links} icon={<i className="fas fa-times" role="presentation" onClick={handleClick} />} className={isOpen ? `${Styles.sideNav} ${Styles.open}` : Styles.sideNav} />
  );
};

export default Sidebar;
