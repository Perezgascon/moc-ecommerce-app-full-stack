import React from 'react';
import styles from './shoppingCartButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'; // Import the shopping cart icon

export default function ShoppingCartButton({ itemCount, totalPrice }) {
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
