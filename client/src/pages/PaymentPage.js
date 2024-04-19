import React from 'react';
import styles from './paymentPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaypal,
  faStripe
} from '@fortawesome/free-brands-svg-icons';
import { faMoneyBill, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import abalogo from '../assets/abalogo.png';
import PaymentButton from '../components/PaymentButton';
import { useParams } from 'react-router-dom';


export default function PaymentPage() {


  const { order_id } = useParams();

  return (
    <div className={styles.paymentMainContainer}>
      <h1>Choose Your Payment Method</h1>
      <div className={styles.paymentContainer}>
        <PaymentButton destination={`/paypal/${order_id}`}>
          <FontAwesomeIcon icon={faPaypal} className={styles.paymentOptionIcon} />
        </PaymentButton>
        <PaymentButton destination={"/dashboard"}>
          <FontAwesomeIcon icon={faStripe} className={styles.paymentOptionIcon} />
        </PaymentButton>
        <PaymentButton destination={"/dashboard"}>
          <FontAwesomeIcon icon={faMoneyBill} className={styles.paymentOptionIcon} />
        </PaymentButton>
        <PaymentButton destination={"/dashboard"}>
          <FontAwesomeIcon icon={faCreditCard} className={styles.paymentOptionIcon} />
        </PaymentButton>
        <PaymentButton destination={"/abapayment"}>
          <img src={abalogo} className={styles.paymentOptionIcon} />
        </PaymentButton>
      </div>
    </div>
  );
}
