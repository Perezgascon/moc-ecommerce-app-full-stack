import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './registerPage.module.css'

export default function Register() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/register', {
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                address: user.address,
                password: user.password
            });
            console.log("Registration successful", response.data);
            navigate('/login');
        } catch (error) {
            setError("Failed to register. " + (error.response?.data?.message || 'Unknown error'));
            console.error("Register error: ", error.response?.data);
        }
    };

    return (
        <div className={styles.registerFormContainer}>
            <h1>Register</h1>
            <form  className={styles.registerForm} onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={handleChange} />

                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={user.lastName} onChange={handleChange} />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />

                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" value={user.address} onChange={handleChange} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={user.password} onChange={handleChange} />

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
