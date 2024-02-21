import React, { useState, useEffect } from 'react';
import styles from './itemsSideBar.module.css';


export default function ItemsSideBar() {
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    // Fetch product categories when the component mounts
    async function fetchCategories() {
      try {
        const response = await fetch('https://ministry-of-cat-shop.onrender.com/categories');
        const categories = await response.json(); // Parse the JSON response
        setProductCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className={styles.sideBar}>
      <h2>Product Categories</h2>
      <ul>
        {productCategories.map((category, index) => (
          <li key={index}>{category.categoryName}</li>
        ))}
      </ul>
    </div>
  );
}
