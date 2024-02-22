import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import styles from './productCard.module.css'

export default function ProductCard({ product }) {
  return (
    <div className={styles.productCard}>
      <Link to={`/product/${product.product_id}`} className={styles.productLink}>
        <h3>{product.product_name}</h3>
        <p>{product.description}</p>
        <img src={product.picture_url} alt={product.product_name} />
        <p>Price: ${product.price}</p>
      </Link>
    </div >
  );
}

