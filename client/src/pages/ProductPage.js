import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import the useParams hook
import styles from './productPage.module.css'; // Import CSS module

const ProductPage = () => {
    const { productId } = useParams(); // Use the useParams hook to get the productId
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();

        // Clean-up function (optional)
        return () => {
            // Any clean-up code goes here
        };
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.productContainer}>
            <h1 className={styles.productName}>{product.product_name}</h1>
            <img className={styles.productImage} src={product.picture_url} alt={product.product_name} />
            <div className={styles.productColors}>
                {/* Product colors content */}
            </div>
            <div className={styles.productDescription}>{product.description}</div>
            {/* <div id="buy-button" className="green-button">ADD TO SHOPPING CART</div> */}
        </div>
    );
}

export default ProductPage;
