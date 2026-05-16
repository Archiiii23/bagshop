import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import styles from './Preloader.module.css'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<'intro' | 'outro' | 'done'>('intro')

  useEffect(() => {
    // Show the preloader word for a short time, then trigger outro
    const timer = setTimeout(() => {
      setStage('outro')
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (stage === 'done') return null

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div 
          className={styles.preloader}
          initial={{ y: '0%' }}
          animate={{ y: stage === 'outro' ? '-100vh' : '0%' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => {
            if (stage === 'outro') {
              setStage('done')
              onComplete()
            }
          }}
        >
          <motion.div 
            className={styles.word}
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: stage === 'outro' ? 0 : 1, 
              y: stage === 'outro' ? -50 : 0 
            }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: stage === 'outro' ? 0 : 0.2 }}
          >
            BAGHOUSE
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
