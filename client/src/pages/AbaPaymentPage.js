import React from 'react'
import styles from './abaPaymentPage.module.css'
import abaqrcodeusd from '../assets/abaqrcodeusd.png'
import abaqrcodekhr from '../assets/abaqrcodekhr.png'

export default function AbaPaymentPage() {
  return (
    <div className={styles.paymentsMainContainer}>
      <h1 className={styles.h1}>ABA Payment</h1>
      <p className={styles.p}>Simply scan the code below or do a transaction to the account number provided</p>
      <h2 className={styles.h2}>Pay in USD</h2>
      <img src={abaqrcodeusd} className={styles.qrCode} />
      <h2 className={styles.h2}>Pay in Riel</h2>
      <img src={abaqrcodekhr} className={styles.qrCode} />

    </div>
  )
}
