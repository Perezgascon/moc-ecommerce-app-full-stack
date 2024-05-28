import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <nav className={styles.navbar}>
      <p className={styles.seoTitle}>Ministry of Cat |<br /> Cat Cafe in <br />Phnom Penh</p>
      <input
        type="checkbox"
        id="menu-toggle"
        className={styles.menuIcon}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="menu-toggle" className={styles.hamburger}>
        <FontAwesomeIcon icon={faBars} />
      </label>
      <div className={`${styles.navbarMenu} ${isChecked ? styles.showMenu : ''}`}>
        <ul>
          <li><a href="https://www.ministryofcat.com/account/login">Sign in</a></li>
          <li><a href="https://www.ministryofcat.com/donate">Donate</a></li>
          <li><a href="https://www.ministryofcat.com/menu">Our menu</a></li>
          <li><a href="https://www.ministryofcat.com/lunch-box">Lunch box</a></li>
          <li><a href="https://www.ministryofcat.com/cat-adoption">Adopt a cat</a></li>
          <li><a href="https://www.ministryofcat.com/cat-boarding">Cat boarding</a></li>
          <li><a href="https://www.ministryofcat.com/cat-supplies">Shop</a></li>
          <li><a className={styles.visitUsButton} href="https://www.ministryofcat.com/visit-us">VISIT US</a></li>
        </ul>
      </div>
    </nav>
  );
}
