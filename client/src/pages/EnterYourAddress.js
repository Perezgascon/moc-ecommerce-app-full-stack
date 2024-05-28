import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import styles from './enterYourAddress.module.css';

export default function EnterYourAddress() {
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Assume false initially
    const [pickup, setPickup] = useState(false); // New state for the checkbox
    const [deliveryTime, setDeliveryTime] = useState(null); // New state for delivery time
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in (you may use context or a more robust solution)
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (isLoggedIn) {
                // Update existing user's address
                const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
                await axios.put(`http://localhost:8080/users/${userId}`, { address });
            } else {
                // Create a new user
                await axios.post('http://localhost:8080/users/register', {
                    first_name: firstName,
                    last_name: lastName,
                    address,
                    email,
                    password: 'defaultpassword', // Set a default password or handle password input securely
                });
            }

            // Save the pickup option and delivery time (if needed)
            localStorage.setItem('pickup', pickup);
            localStorage.setItem('deliveryTime', deliveryTime);

            // Navigate to the payment page
            navigate('/payment');
        } catch (error) {
            console.error('Error saving address:', error);
        }
    };

    return (
        <div className={styles.addressFormContainer}>
            <h1>Enter Your Address</h1>
            <form onSubmit={handleSubmit}>
                {!isLoggedIn && (
                    <>
                        <label>
                            First Name:
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                    </>
                )}
                <label>
                    Address:
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={pickup}
                        onChange={(e) => setPickup(e.target.checked)}
                    />
                    Click this box if you would like to pick up your order at Ministry of Cat
                </label>
                <label>
                    What Time Do You Want Your Delivery?
                    <Datetime
                        value={deliveryTime}
                        onChange={setDeliveryTime}
                        inputProps={{ placeholder: "Select Date and Time" }}
                    />
                </label>
                <button type="submit">Continue to Payment</button>
            </form>
        </div>
    );
}
