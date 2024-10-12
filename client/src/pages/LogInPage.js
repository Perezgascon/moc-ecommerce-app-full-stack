import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import styles from './loginPage.module.css'

export default function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/users/login', credentials);

            console.log("Login successful", response.data);

            localStorage.setItem('token', response.data.token);

            alert("Login succcesful!");

            navigate('/dashboard');

        } catch (error) {
            console.error("Login error: ", error.response.data);
            setShowModal(true);
        }

    };
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.loginFormContainer}>
            <h1>Login</h1>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {/* Modal */}
            <Modal
                show={showModal}
                message="Incorrect password. Please try again."
                handleClose={closeModal}
            />
        </div>
    );
}
