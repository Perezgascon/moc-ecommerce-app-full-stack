    import React, { useState } from 'react'
    import axios from 'axios'
    import { useNavigate } from 'react-router-dom'

    export default function Login() {
        const [email, setEmail] = useState('')

        const navigate = useNavigate()

        const handleSubmit = async (e) => {
            e.preventDefault()

            try {
                const response = await axios.post('http://localhost:3000/login', {
                    email
                })

                console.log("Login successful", response.data)

                localStorage.setItem('token', response.data.token)

                navigate('/dashboard')

            } catch (error) {
                console.error("Login error: ", error.response.data)
            }
        }

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }