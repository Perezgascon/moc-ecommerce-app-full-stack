import React, { useState, useEffect } from 'react';
import styles from './itemsSideBar.module.css';
import axios from 'axios'; // Import Axios

export default function ItemsSideBar() {
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    // Fetch product categories when the component mounts
    async function fetchCategories() {
      try {
        const response = await axios.get('/categories');
        setProductCategories(response.data); // Use response.data to access the JSON data
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
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
}
