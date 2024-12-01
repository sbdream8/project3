"use client"; 

import Image from "next/image";
import styles from "./page.module.css";


import { useState } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    name: '',
    price: '',
    date: '',
  });
  const [totalSpent, setTotalSpent] = useState(0);

  // Handle input changes for item fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the price field is being updated, we ensure it's stored as a number
    if (name === 'price') {
      // Parse the price to a number and allow empty string (when clearing input)
      setCurrentItem({
        ...currentItem,
        [name]: value === '' ? '' : parseFloat(value), // if empty, set as empty string
      });
    } else {
      setCurrentItem({
        ...currentItem,
        [name]: value,
      });
    }
  };

  // Handle adding an item to the list
  const handleAddItem = () => {
    const { name, price, date } = currentItem;

    // Basic validation for input fields
    if (!name || price === '' || !date) {
      alert('Please fill out all fields!');
      return;
    }

    // Parse price and check if it's a valid number
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      alert('Please enter a valid price.');
      return;
    }

    // Update state with new item
    setItems([
      ...items,
      { name, price: parsedPrice, date },
    ]);

    // Update total spent
    setTotalSpent(totalSpent + parsedPrice);

    // Reset the current item form
    setCurrentItem({ name: '', price: '', date: '' });
  };

  return (
    <div className={styles.container} style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1 className={styles.heading}>Shopping Tracker</h1>

      {/* Item input form */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          Item Name:
          <input
            className={styles.input}
            type="text"
            name="name"
            value={currentItem.name}
            onChange={handleChange}
            placeholder="Enter item name"
          />
        </label>
        <br />
        <label>
          Price:
          <input
            className={styles.input}
            type="number"
            name="price"
            value={currentItem.price}
            onChange={handleChange}
            placeholder="Enter price"
            step="0.01"
            min="0"
          />
        </label>
        <br />
        <label>
          Date:
          <input
            className={styles.input}
            type="date"
            name="date"
            value={currentItem.date}
            onChange={handleChange}
          />
        </label>
        <br />
        <button className={styles.button} onClick={handleAddItem} style={{ marginTop: '10px' }}>
          Add Item
        </button>
      </div>

      <h2>Shopping List</h2>
      {/* Display table if there are items */}
      {items.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Total spent */}
      <h3 className={styles.total}>Total Spent: ${totalSpent.toFixed(2)}</h3>
    </div>
  );
}