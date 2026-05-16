import { useCart } from '../context/CartContext'
import styles from './OrderSuccessModal.module.css'

export default function OrderSuccessModal() {
  const { isSuccessOpen, setIsSuccessOpen } = useCart()

  return (
    <div className={`${styles.overlay} ${isSuccessOpen ? styles.open : ''}`}>
      <div className={styles.modal}>
        <div className={styles.iconWrap}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 className={styles.title}>ORDER CONFIRMED</h2>
        <p className={styles.message}>
          Thank you for ordering from us we will give the best and more good things. Your style upgrade is on its way!
        </p>
        <button className={styles.closeBtn} onClick={() => setIsSuccessOpen(false)}>
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  )
}
