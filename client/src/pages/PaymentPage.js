import React, { useState, useEffect } from 'react';
import styles from './paymentPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal, faStripe } from '@fortawesome/free-brands-svg-icons';
import { faMoneyBill, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import abalogo from '../assets/abalogo.png';
import PaymentButton from '../components/PaymentButton';
import axios from 'axios';

export default function PaymentPage() {
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderId = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orders');
        const latestOrder = response.data[0]; // Assuming the latest order is at index 0
        if (latestOrder) {
          setOrderId(latestOrder.order_id);
        } else {
          setError(new Error('No orders found'));
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orderId:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchOrderId();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.paymentMainContainer}>
      <h1>Choose Your Payment Method</h1>
      <div className={styles.paymentContainer}>
        <PaymentButton destination={`/paypal/${orderId}`}>
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
