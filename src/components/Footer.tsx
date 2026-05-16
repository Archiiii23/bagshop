import { useState } from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [couponCode, setCouponCode] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) {
      const emailPrefix = email.split('@')[0].replace(/[^a-zA-Z]/g, '')
      const first3 = (emailPrefix.length >= 3 ? emailPrefix.substring(0, 3) : emailPrefix.padEnd(3, 'X')).toUpperCase()
      const nums = Math.floor(100 + Math.random() * 900)
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const alpha1 = chars.charAt(Math.floor(Math.random() * chars.length))
      const alpha2 = chars.charAt(Math.floor(Math.random() * chars.length))
      
      setCouponCode(`${first3}${nums}${alpha1}${alpha2}`)
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.neonLine} />

      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="#" className={styles.logo}>
              CHEAP<span className={styles.logoAccent}>BAG</span>HOUSE
            </a>
            <p className={styles.tagline}>
              Carry the Vibe. Save the Cash.<br />
              Premium Quality Bags at Hype-Driven Discounts.
            </p>
            <div className={styles.socials}>
              {[
                { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { label: 'Twitter/X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { label: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
              ].map(s => (
                <a key={s.label} href="#" className={styles.socialLink} aria-label={s.label}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkCol}>
              <span className={styles.colTitle}>SHOP</span>
              {['New Arrivals', 'College Bags', 'Trolley Bags', 'Backpacks', 'Ladies Bag', 'Handbags'].map(l => (
                <a key={l} href="#" className={styles.footLink}>{l}</a>
              ))}
            </div>
            <div className={styles.linkCol}>
              <span className={styles.colTitle}>HELP</span>
              {['Shipping & Returns', 'Size Guide', 'Track Order', 'FAQs', 'Contact Us'].map(l => (
                <a key={l} href="#" className={styles.footLink}>{l}</a>
              ))}
            </div>
            <div className={styles.linkCol}>
              <span className={styles.colTitle}>COMPANY</span>
              {['About Us', 'Blog', 'Careers', 'Press', 'Affiliates'].map(l => (
                <a key={l} href="#" className={styles.footLink}>{l}</a>
              ))}
            </div>
          </div>

          <div className={styles.newsletter}>
            <span className={styles.colTitle}>JOIN THE DROP LIST</span>
            <p className={styles.newsletterSub}>
              Get 10% OFF your first order + exclusive early access to flash deals.
            </p>
            {submitted ? (
              <div className={styles.successMsg} style={{ alignItems: 'flex-start' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" style={{ marginTop: '2px', flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span>You're in! Use this code for 10% OFF:</span>
                  <strong style={{ fontSize: '18px', letterSpacing: '2px', background: 'var(--bg-glass)', padding: '4px 8px', borderRadius: '4px', display: 'inline-block', border: '1px dashed var(--gold)' }}>
                    {couponCode}
                  </strong>
                </div>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
                <button type="submit" className={styles.submitBtn}>GET 10% OFF</button>
              </form>
            )}
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>© 2024 CheapBagHouse. All rights reserved.</span>
          <div className={styles.legal}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
              <a key={l} href="#" className={styles.legalLink}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
