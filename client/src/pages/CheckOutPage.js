import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './checkOutPage.module.css';
import ClearCartButton from '../components/ClearCartButton';
import GoBackButton from '../components/GoBackButton';
import GreenButton from '../components/GreenButton';

export default function CheckOutPage() {
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orderItems/withProductDetails/');
        setOrderItems(response.data);
        calculateOrderTotal(response.data);
      } catch (error) {
        console.error('Error fetching order items:', error);
      }
    };

    fetchOrderItems();
  }, []);

  const calculateOrderTotal = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += parseFloat(item.Product.price) * item.quantity;
    });
    setOrderTotal(total.toFixed(2));
  };

  return (
    <div>
      <GoBackButton />
      <ClearCartButton />
      <div className={styles.checkOutMainContainer}>
        <h1>Your Order</h1>
        <div id="order-container">
          {orderItems.map((orderItem) => (
            <div key={orderItem.orderItemId}>
              <p>Product Name: {orderItem.Product.product_name}</p>
              <p>Quantity: {orderItem.quantity}</p>
              {/* Add more details as needed */}
            </div>
          ))}
        </div>
        <div className={styles.totalContainer}>
          <p>Total: ${orderTotal}</p>
        </div>
        <GreenButton message={"CHECKOUT"} />
      </div>
    </div>
  );
}
