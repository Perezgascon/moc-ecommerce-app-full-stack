import React, { useState, useEffect } from 'react';
import styles from './itemsSideBar.module.css';
import { getProductCategories} from '../'; // Import the function to fetch categories

export default function ItemsSideBar() {
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    // Fetch product categories when the component mounts
    async function fetchCategories() {
      try {
        const categories = await getProductCategories();
        setProductCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div className={styles.sidebar}>
      <h2>Product Categories</h2>
      <ul>
        {productCategories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
}
