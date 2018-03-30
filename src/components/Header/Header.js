import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search/';
import styles from './Header.scss';
// import logoImage from '../../images/logo.png';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">
          <img
            src="https://www.themoviedb.org/static_cache/v4/logos/powered-by-rectangle-green-dcada16968ed648d5eb3b36bbcfdd8cdf804f723dcca775c8f2bf4cea025aad6.svg"
            alt="Movie DB Logo"
          />
        </Link>
      </div>
      <Search />
    </div>
  </header>
);

export default Header;
