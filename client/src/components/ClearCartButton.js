import React from 'react'
import styles from './clearCartButton.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function ClearCartButton({ orderId }) {

    const handleClearCart = async () => {
        try {
            // Make a DELETE request to the endpoint to clear the cart
            await axios.delete(`http://localhost:8080/orders/${orderId}`);
            // Optionally, you can also update the local state or display a success message
            alert('Cart cleared successfully');
        } catch (error) {
            console.error('Error clearing cart:', error);
            // Handle errors, display error messages, etc.
        }
    };

    return (
        <Link to={"/dashboard"} className={styles.productLink}>
            <button className={styles.clearButton} onClick={handleClearCart}><label class="shopping-cart-icon"><i class="fa-solid fa-cart-shopping"></i></label>
                <p>Clear my cart</p>
            </button>
        </Link>
    )
}
