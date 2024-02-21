import React, { useState, useEffect } from 'react';
import styles from './categoriesSideBar.module.css';


export default function CategoriesSideBar({ onSelectCategory }) {
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    // Fetch product categories when the component mounts
    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:8080/categories');
        const categories = await response.json(); // Parse the JSON response
        setProductCategories(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    onSelectCategory(categoryName);
  };

  return (
    <div className={styles.sideBar}>
      <h2>Product Categories</h2>
      <ul>
        {productCategories.map((category, index) => (
          <li key={index} onClick={() => handleCategoryClick(category.categoryName)}>{category.categoryName}</li>
        ))}
      </ul>
    </div>
  );
}
