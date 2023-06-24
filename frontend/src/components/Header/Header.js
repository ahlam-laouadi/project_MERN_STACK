import React from 'react';
import Top from './Top/Top';
import Main from './Main/Main';
import Desktop from './Desktop/Desktop';
import Mobile from './Mobile/Mobile';

const Header = () => {
  return (
    <div>
      <Top />
      <Main />
      <Desktop />
      <Mobile />
    </div>
  );
};

export default Header;
