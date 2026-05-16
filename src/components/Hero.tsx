import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={styles.hero} ref={ref}>
      <div className={styles.bg}>
        <img
          src="/hero-bg.png"
          alt="Aesthetic composition of ladies bags and accessories"
          className={styles.bgImg}
        />
        <div className={styles.bgOverlay} />
      </div>

      <div className={`${styles.content} ${loaded ? styles.loaded : ''}`}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          NEW DROPS EVERY WEEK
        </div>

        <h1 className={styles.headline}>
          <span className={styles.headlineLine1}>CARRY THE</span>
          <span className={styles.headlineLine2}>VIBE.</span>
          <span className={styles.headlineLine3}>
            SAVE THE <span className={styles.headlineGold}>CASH.</span>
          </span>
        </h1>

        <p className={styles.sub}>
          Premium Quality Bags at Hype-Driven Discounts.
        </p>

        <div className={styles.stats}>
          {[
            { value: '50K+', label: 'Happy Customers' },
            { value: 'Up to 60%', label: 'Off Retail Price' },
            { value: '500+', label: 'Styles in Stock' },
          ].map(s => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.ctas}>
          <button className={`clay-btn clay-btn-accent ${styles.ctaPrimary}`}>
            <span>SHOP NOW</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button className={`clay-btn ${styles.ctaSecondary}`}>
            VIEW COLLECTIONS
          </button>
        </div>
      </div>

      <div className={styles.scrollCue}>
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>SCROLL</span>
      </div>
    </div>
  )
}
