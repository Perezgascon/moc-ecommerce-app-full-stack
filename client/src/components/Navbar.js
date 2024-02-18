import React from 'react'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
        <p className={styles.seoTitle}>Ministry of Cat | Cat Cafe in Phnom Penh</p>
        <div className={styles.navbarMenu}>
          <ul>
            <li><a href="https://www.ministryofcat.com/account/login">Sign in</a></li>
            <li><a href="https://www.ministryofcat.com/donate">Donate</a></li>
            <li><a href="https://www.ministryofcat.com/menu">Our menu</a></li>
            <li><a href="https://www.ministryofcat.com/lunch-box">Lunch box</a></li>
            <li><a href="https://www.ministryofcat.com/cat-adoption">Adopt a cat</a></li>
            <li><a href="https://www.ministryofcat.com/cat-boarding">Cat boarding</a></li>
            <li><a href="https://www.ministryofcat.com/cat-supplies">Shop</a></li>
            <li><a id="visit-us-button" href="https://www.ministryofcat.com/visit-us">VISIT US</a></li>
          </ul>
        </div>
    </nav>
  )
}
