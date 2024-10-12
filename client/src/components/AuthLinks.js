import React from 'react';
import styles from './authLinks.module.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AuthLinks() {
    const navigate = useNavigate(); // Create an instance of useNavigate

    return (
        <div className={styles.authButtonContainer}>
            <button className={styles.authButton} onClick={() => navigate('/register')} style={{ margin: '10px' }}>Register</button>
            <button className={styles.authButton} onClick={() => navigate('/login')} style={{ margin: '10px' }}>Login</button>
        </div>
    );
}

export default AuthLinks;
