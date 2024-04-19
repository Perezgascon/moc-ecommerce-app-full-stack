import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './shoppingCartButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'; // Import the shopping cart icon

export default function ShoppingCartButton() {
  const [itemCount, setItemCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orderItems/withProductDetails/');
        const items = response.data;

        let count = 0;
        let total = 0;

        items.forEach((item) => {
          count += item.quantity;
          total += parseFloat(item.Product.price) * item.quantity;
        });

        setItemCount(count);
        setTotalPrice(total.toFixed(2));
      } catch (error) {
        console.error('Error fetching order items:', error);
      }
    };

    fetchOrderItems();
  }, []);

  const handleClick = () => {
    // Navigate to the "/checkout" route
    window.location.href = "/checkout";
  };

  return (
    <div>
      <button onClick={handleClick}>
        <div className={styles.shoppingCart}>
          <div className={styles.shoppingCartIcon}>
            <FontAwesomeIcon icon={faCartShopping} /> {/* Use the Font Awesome shopping cart icon */}
          </div>
          <div>{itemCount} items</div>
          <div>${totalPrice}</div>
        </div>
      </button>
    </div>
  );
}
