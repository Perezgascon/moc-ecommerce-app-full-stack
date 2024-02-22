import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/', {
                first_name: firstName, // Use first_name instead of firstName
                last_name: lastName, // Use last_name instead of lastName
                address,
                email,
            });
            console.log("Registration successful", response.data);
            navigate('/login');
        } catch (error) {
            console.error("Register error: ", error.response.data);
            // Handle error here, such as displaying a message to the user
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
