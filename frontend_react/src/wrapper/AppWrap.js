import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavigationDots, SocialMedia } from '../components';

const AppWrap = (Component, idName, classNames) =>
  function HOC() {
    const isTabletOrMobile = useMediaQuery({ query: '(min-width: 1100px)' });
    return (
      <div id={idName} className={`app__container ${classNames}`}>
        {isTabletOrMobile ? <SocialMedia /> : ''}
        <div className='app__wrapper app__flex'>
          <Component />
        </div>
        {isTabletOrMobile ? <NavigationDots active={idName} /> : ''}
      </div>
    );
  };

export default AppWrap;
