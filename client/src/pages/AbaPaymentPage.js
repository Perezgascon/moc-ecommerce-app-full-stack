import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './abaPaymentPage.module.css';
import abaqrcodeusd from '../assets/abaqrcodeusd.png';
import abaqrcodekhr from '../assets/abaqrcodekhr.png';
import GreenButton from '../components/GreenButton';

export default function AbaPaymentPage() {
  const [orderId, setOrderId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchOrderId = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orderItems/withProductDetails/');
        if (response.data.length > 0) {
          setOrderId(response.data[0].orderId);
        }
      } catch (error) {
        console.error('Error fetching order ID:', error);
      }
    };

    fetchOrderId();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // const userId = localStorage.getItem('userId');
        const response = await axios.get("http://localhost:8080/users/f8c8d4ef-124b-4e54-be8b-d87d1ea06815");
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    if (orderId) {
      fetchUserDetails();
    }
  }, [orderId]);

  const handleSendEmail = async () => {
    if (!orderId) {
      alert('Order ID is not available');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/orders/send-email', { orderId, userDetails });
      alert(response.data);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending the email');
    }
  };

  return (
    <div className={styles.paymentsMainContainer}>
      <h1 className={styles.h1}>ABA Payment</h1>
      <p className={styles.p}>Simply scan the code below or do a transaction to the account number provided</p>
      <p className={styles.p}>When ready, please send a screenshot of the transfer to the following number of Telegram or WhatsApp and the order will be on its way</p>
      <GreenButton message={"I sent the screenshot"} handleClick={handleSendEmail} />
      <p className={styles.p}>+855 11 763 401</p>
      <h2 className={styles.h2}>Pay in USD</h2>
      <img src={abaqrcodeusd} className={styles.qrCode} alt="USD QR Code" />
      <h2 className={styles.h2}>Pay in Riel</h2>
      <img src={abaqrcodekhr} className={styles.qrCode} alt="Riel QR Code" />
    </div>
  );
}
