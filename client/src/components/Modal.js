import React from 'react';
import styles from './modal.module.css';  // Assuming you have a CSS file for styling the modal

const Modal = ({ show, message, handleClose }) => {
    if (!show) {
        return null; // Don't render anything if 'show' is false
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p>{message}</p>
                <button onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;
