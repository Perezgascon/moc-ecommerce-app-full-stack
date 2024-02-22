import React from 'react'
import styles from './greenButton.module.css'

export default function GreenButton({ message, handleClick }) {
    return (
        <button className={styles.greenButton} onClick={handleClick}>{message}</button>
    )
}
