import { useCart } from '../context/CartContext'
import styles from './CartSidebar.module.css'

export default function CartSidebar() {
  const { 
    items, 
    cartTotal, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart,
    setIsPaymentOpen
  } = useCart()

  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsPaymentOpen(true)
  }

  return (
    <>
      <div 
        className={`${styles.overlay} ${isCartOpen ? styles.open : ''}`} 
        onClick={() => setIsCartOpen(false)}
      />
      <div className={`${styles.sidebar} ${isCartOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>YOUR CART</h2>
          <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemImgWrap}>
                  <img src={item.image_url} alt={item.name} className={styles.itemImg} />
                </div>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</span>
                  <div className={styles.quantityControls}>
                    <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    <button className={styles.qtyBtn} onClick={() => removeFromCart(item.id)} style={{ marginLeft: 'auto', background: 'transparent', color: 'var(--text-secondary)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>TOTAL</span>
            <span className={styles.totalValue}>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
          <button 
            className={styles.checkoutBtn} 
            disabled={items.length === 0}
            onClick={handleCheckout}
          >
            CONFIRM ORDER
          </button>
        </div>
      </div>
    </>
  )
}
