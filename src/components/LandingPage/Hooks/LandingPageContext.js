import React, { createContext, useState } from 'react';
import PropType from 'prop-types';

export const HomeContext = createContext();

const HomeContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <HomeContext.Provider value={{
      handleClick,
      isOpen,
    }}
    >
      {children}
    </HomeContext.Provider>
  );
};

HomeContextProvider.propTypes = {
  children: PropType.node.isRequired,
};

export default HomeContextProvider;
