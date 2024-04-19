import React from 'react';
import styles from './paymentButton.module.css';
import { useNavigate } from 'react-router-dom';


export default function PaymentButton({ destination, children }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(destination); // Navigate to the destination specified by the prop
    };
    return (
        <div>
            <button className={styles.paymentOption} onClick={handleClick}>
                {children}
            </button>
        </div>
    )
}
