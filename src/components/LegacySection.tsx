import styles from './LegacySection.module.css'

const STATS = [
  { number: '65+', suffix: ' YEARS', label: 'OF EXCELLENCE & TRUST' },
  { number: '0', suffix: '', label: 'CUSTOMER COMPLAINTS' },
  { number: '100', suffix: '%', label: 'USER FRIENDLY EXPERIENCE' },
  { number: '1M+', suffix: '', label: 'BAGS DELIVERED GLOBALLY' },
]

export default function LegacySection() {
  return (
    <section className={styles.section} id="legacy">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>OUR LEGACY</span>
          <h2 className={styles.title}>
            BUILDING TRUST FOR <span className={styles.titleAccent}>OVER SIX DECADES</span>
          </h2>
          <p className={styles.description}>
            We don't just sell bags, we build relationships. With over 65 years of industry experience, our commitment to quality has resulted in zero customer complaints. Enjoy a seamless, user-friendly shopping experience with unmatched customer support and premium products.
          </p>
        </div>

        <div className={styles.statsGrid}>
          {STATS.map((stat, i) => (
            <div key={i} className={styles.statCard} style={{ animationDelay: `${i * 0.1}s` }}>
              <span className={styles.statNumber}>
                {stat.number}<span className={styles.statNumberAccent}>{stat.suffix}</span>
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
