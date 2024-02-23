import React from 'react';
import styles from './clearCartButton.module.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'; // Import the shopping cart icon

export default function ClearCartButton({ orderId }) {

    const handleClearCart = async () => {
        try {
            // Make a DELETE request to the endpoint to clear the cart
            await axios.delete(`http://localhost:8080/orders/${orderId}`);
            // Optionally, you can also update the local state or display a success message
            alert('Cart cleared successfully');
            // Navigate to the dashboard after clearing the cart
            window.location.href = "/dashboard";
        } catch (error) {
            console.error('Error clearing cart:', error);
            // Handle errors, display error messages, etc.
        }
    };

    return (
        <button className={styles.clearCartButton} onClick={handleClearCart}>
            <div className={styles.shoppingCartIcon}>
                <FontAwesomeIcon icon={faCartShopping} /> {/* Use the Font Awesome shopping cart icon */}
            </div>
            <p>Clear my cart</p>
        </button>
    );
}
