import React from 'react'
import styles from './checkOutPage.module.css'
import ClearCartButton from '../components/ClearCartButton'
import GoBackButton from '../components/GoBackButton'
import GreenButton from '../components/GreenButton'

export default function CheckOutPage() {
  return (
    <div>
      <GoBackButton />
      <ClearCartButton />
      <div className={styles.checkOutMainContainer}>
        <h1>Your Order</h1>
        <div id="order-container">
        </div>
        <div className={styles.totalContainer}>
          <p>Total: $<span id="total-order"></span></p>
        </div>
        <GreenButton message={"CHECKOUT"} />
      </div>
    </div>
  )
}
