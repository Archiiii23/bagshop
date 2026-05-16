import { useState } from 'react'
import { useCart } from '../context/CartContext'
import styles from './PaymentModal.module.css'

const PAYMENT_METHODS = [
  {
    id: 'upi',
    label: 'UPI (GPay, PhonePe, Paytm)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    )
  },
  {
    id: 'card',
    label: 'Credit / Debit Card',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    )
  },
  {
    id: 'netbanking',
    label: 'Net Banking',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
      </svg>
    )
  },
  {
    id: 'cod',
    label: 'Cash on Delivery (COD)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>
      </svg>
    )
  }
]

export default function PaymentModal() {
  const { isPaymentOpen, setIsPaymentOpen, setIsSuccessOpen, cartTotal, clearCart } = useCart()
  const [selectedMethod, setSelectedMethod] = useState<string>('upi')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = () => {
    setIsProcessing(true)
    
    // Simulate payment processing time based on method
    const delay = selectedMethod === 'cod' ? 800 : 2500
    
    setTimeout(() => {
      setIsProcessing(false)
      setIsPaymentOpen(false)
      setIsSuccessOpen(true)
      clearCart()
    }, delay)
  }

  return (
    <div className={`${styles.overlay} ${isPaymentOpen ? styles.open : ''}`}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>SELECT PAYMENT</h2>
          <button className={styles.closeBtn} onClick={() => setIsPaymentOpen(false)} disabled={isProcessing}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          {PAYMENT_METHODS.map(method => {
            const isSelected = selectedMethod === method.id
            return (
              <div key={method.id} className={`${styles.optionWrapper} ${isSelected ? styles.selected : ''}`}>
                <div className={styles.optionHeader} onClick={() => !isProcessing && setSelectedMethod(method.id)}>
                  <div className={styles.radio}>
                    <div className={styles.radioInner} />
                  </div>
                  <div className={styles.optionIcon}>{method.icon}</div>
                  <span className={styles.optionLabel}>{method.label}</span>
                </div>
                
                {isSelected && (
                  <div className={styles.optionBody}>
                    {method.id === 'upi' && (
                      <>
                        <div className={styles.qrMockup}>
                          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><rect x="7" y="7" width="3" height="3"/><rect x="14" y="7" width="3" height="3"/><rect x="7" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/>
                          </svg>
                          <span>Scan QR Code with any UPI App</span>
                        </div>
                        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px' }}>OR</div>
                        <div className={styles.inputGroup}>
                          <label>Enter UPI ID</label>
                          <input type="text" className={styles.input} placeholder="e.g. username@okhdfc" />
                        </div>
                      </>
                    )}

                    {method.id === 'card' && (
                      <>
                        <div className={styles.inputGroup}>
                          <label>Card Number</label>
                          <input type="text" className={styles.input} placeholder="0000 0000 0000 0000" maxLength={19} />
                        </div>
                        <div className={styles.row}>
                          <div className={styles.inputGroup}>
                            <label>Expiry Date</label>
                            <input type="text" className={styles.input} placeholder="MM/YY" maxLength={5} />
                          </div>
                          <div className={styles.inputGroup}>
                            <label>CVV</label>
                            <input type="password" className={styles.input} placeholder="123" maxLength={4} />
                          </div>
                        </div>
                        <div className={styles.inputGroup}>
                          <label>Name on Card</label>
                          <input type="text" className={styles.input} placeholder="Full Name" />
                        </div>
                      </>
                    )}

                    {method.id === 'netbanking' && (
                      <div className={styles.inputGroup}>
                        <label>Select Bank</label>
                        <select className={styles.input} style={{ appearance: 'auto' }}>
                          <option>HDFC Bank</option>
                          <option>SBI</option>
                          <option>ICICI Bank</option>
                          <option>Axis Bank</option>
                          <option>Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    )}

                    {method.id === 'cod' && (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>
                        Pay using Cash or UPI to the delivery executive when your order arrives.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className={styles.footer}>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>AMOUNT TO PAY</span>
            <span className={styles.totalValue}>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
          <button 
            className={styles.payBtn} 
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className={styles.loader} />
                PROCESSING...
              </>
            ) : selectedMethod === 'cod' ? 'PLACE ORDER' : `PAY ₹${cartTotal.toLocaleString('en-IN')}`}
          </button>
        </div>
      </div>
    </div>
  )
}
