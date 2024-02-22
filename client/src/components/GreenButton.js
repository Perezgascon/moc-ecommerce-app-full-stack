import React from 'react'
import styles from './greenButton.module.css'

export default function GreenButton({ message, handleClick }) {
    return (
        <div className={styles.greenButton} onClick={handleClick}>{message}</div>
    )
}
