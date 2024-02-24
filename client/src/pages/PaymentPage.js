import React from 'react';
import styles from './paymentPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal,
  faStripe
 } from '@fortawesome/free-brands-svg-icons';
 import { faMoneyBill, faCreditCard } from '@fortawesome/free-solid-svg-icons';
 import abalogo from '../assets/abalogo.png';


export default function PaymentPage() {
  return (
    <div className={styles.paymentMainContainer}>
      <h1>Choose Your Payment Method</h1>
      <div className={styles.paymentContainer}>
        <div className={styles.paymentOption}><FontAwesomeIcon icon={faPaypal} className={styles.paymentOptionIcon} /></div>
        <div className={styles.paymentOption}><FontAwesomeIcon icon={faStripe} className={styles.paymentOptionIcon} /></div>
        <div className={styles.paymentOption}><FontAwesomeIcon icon={faMoneyBill} className={styles.paymentOptionIcon} /></div>
        <div className={styles.paymentOption}><FontAwesomeIcon icon={faCreditCard} className={styles.paymentOptionIcon} /></div>
        <div className={styles.paymentOption}><img src={abalogo} className={styles.paymentOptionIcon} /></div>
      </div>
    </div>
  );
}
