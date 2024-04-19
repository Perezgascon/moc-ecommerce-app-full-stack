import React, { useState, useEffect } from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';
// import { useParams } from 'react-router-dom';

export default function PayPalPaymentPage({ orderId }) {
    // const { orderId } = useParams(); 

    const [totalAmount, setTotalAmount] = useState(null);

    useEffect(() => {
        const fetchTotalAmount = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/orders/${orderId}/total`);
                setTotalAmount(response.data.total); // Assuming the response structure is { total: amount }
            } catch (error) {
                console.error('Error fetching total amount:', error);
            }
        };

        fetchTotalAmount();
    }, [orderId]);

    return (
        <div>
            {totalAmount !== null ? (
                <PayPalButtons
                    style={{ layout: "horizontal" }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: totalAmount, // Use the fetched total amount here
                                        currency_code: 'USD'
                                    }
                                }
                            ]
                        });
                    }}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
