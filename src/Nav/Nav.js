import React from 'react';
import styles from './Nav.css';

const Nav = (props) => {
  const {
    className,
    style = {},
    navs = [],
  } = props;

  return (
    <nav className={`${styles.nav} ${className}`} style={style}>
      {
        navs.map(item => (
          <div className={`${styles.navItem} ${item.className}`} style={item.style}>
            {item.text}
          </div>
        ))
      }
    </nav>
  );
};
export default Nav;
