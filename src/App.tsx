import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategoryLaunchpad from './components/CategoryLaunchpad'
import FeaturedDrop from './components/FeaturedDrop'
import TrustSection from './components/TrustSection'
import LegacySection from './components/LegacySection'

import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import PaymentModal from './components/PaymentModal'
import OrderSuccessModal from './components/OrderSuccessModal'
import { CartProvider } from './context/CartContext'
import { ReactLenis } from 'lenis/react'
import { useState, useEffect } from 'react'
import Preloader from './components/Preloader'
export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  // Disable scroll when loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 2, smoothWheel: true }}>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <CartProvider>
        <Navbar />
        <main>
          <Hero />
          <CategoryLaunchpad />
          <FeaturedDrop />
          <TrustSection />
          <LegacySection />

          <Testimonials />
        </main>
        <Footer />
        <CartSidebar />
        <PaymentModal />
        <OrderSuccessModal />
      </CartProvider>
    </ReactLenis>
  )
}
