import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartCount, setIsCartOpen } = useCart()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#" className={styles.logo}>
          CHEAP<span className={styles.logoAccent}>BAG</span>HOUSE
        </a>

        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {[
            { label: 'NEW ARRIVALS', href: '#new-arrivals' },
            { label: 'CATEGORIES', href: '#' },
            { label: 'OUR LEGACY', href: '#legacy' },
            { label: 'ABOUT', href: '#' }
          ].map(link => (
            <a key={link.label} href={link.href} className={styles.link} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.cartBtn} aria-label="Cart" onClick={() => setIsCartOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </button>
          <button className={styles.shopBtn}>SHOP NOW</button>
          <button
            className={`${styles.menuToggle} ${menuOpen ? styles.menuOpen : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
      <div className={styles.neonLine} />
    </nav>
  )
}
