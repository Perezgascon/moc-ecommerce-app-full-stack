import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './checkOutPage.module.css';
import ClearCartButton from '../components/ClearCartButton';
import PastelButton from '../components/PastelButton';
import GreenButton from '../components/GreenButton';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

export default function CheckOutPage() {
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate(); // Assign useNavigate to navigate

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orderItems/withProductDetails/');
        setOrderItems(response.data);
        calculateOrderTotal(response.data);
        setOrderId(response.data[0].orderId);
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

  const updateQuantity = async (orderItemId, quantity) => {
    try {
      await axios.put(`http://localhost:8080/orderItems/${orderItemId}`, { quantity });
      const updatedOrderItems = orderItems.map(item =>
        item.orderItemId === orderItemId ? { ...item, quantity } : item
      );
      setOrderItems(updatedOrderItems);
      calculateOrderTotal(updatedOrderItems);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (orderItemId) => {
    try {
      await axios.delete(`http://localhost:8080/orderItems/${orderItemId}`);
      const updatedOrderItems = orderItems.filter(item => item.orderItemId !== orderItemId);
      setOrderItems(updatedOrderItems);
      calculateOrderTotal(updatedOrderItems);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleIncrease = (orderItemId, currentQuantity) => {
    updateQuantity(orderItemId, currentQuantity + 1);
  };

  const handleDecrease = (orderItemId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(orderItemId, currentQuantity - 1);
    }
  };

  const handleClick = () => {
    // Navigate to the payment page route
    navigate('/enter-your-address');

  };

  return (
    <div>
      <PastelButton message={"Go back to categories"} destination={"/dashboard"} />
      <ClearCartButton orderId={orderId} />
      <div className={styles.checkOutMainContainer}>
        <h1>Your Order</h1>
        <div id="order-container">
          {orderItems.map((orderItem) => (
            <div key={orderItem.orderItemId} className={styles.orderItem}>
              <p>{orderItem.Product.product_name}</p>
              <p>Quantity: {orderItem.quantity}</p>
              <button onClick={() => handleIncrease(orderItem.orderItemId, orderItem.quantity)}>+</button>
              <button onClick={() => handleDecrease(orderItem.orderItemId, orderItem.quantity)}>-</button>
              <button onClick={() => removeItem(orderItem.orderItemId)}>Remove</button>
            </div>
          ))}
        </div>
        <div className={styles.totalContainer}>
          <p>Total: ${orderTotal}</p>
        </div>
        <GreenButton message={"CHECKOUT"} handleClick={handleClick} />
      </div>
    </div>
  );
}
