import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'

// Defining a local Product type since we removed supabase import
export type Product = {
  id: string
  name: string
  category_id: string
  original_price: number
  sale_price: number
  image_url: string
  badge_discount: string
  badge_new: boolean
  in_stock: boolean
  created_at?: string
}
import styles from './FeaturedDrop.module.css'

const FALLBACK: Product[] = [
  { id: '1', name: 'Urban Street Backpack', category_id: '', original_price: 1499, sale_price: 749, image_url: '/images/new_arrival_1.png', badge_discount: '50% OFF', badge_new: true, in_stock: true, created_at: '' },
  { id: '2', name: 'Slim College Tote', category_id: '', original_price: 999, sale_price: 449, image_url: '/images/new_arrival_2.png', badge_discount: '55% OFF', badge_new: true, in_stock: true, created_at: '' },
  { id: '3', name: 'Everyday Crossbody', category_id: '', original_price: 799, sale_price: 349, image_url: '/images/new_arrival_3.png', badge_discount: '56% OFF', badge_new: true, in_stock: true, created_at: '' },
  { id: '4', name: 'Minimalist Messenger', category_id: '', original_price: 1199, sale_price: 499, image_url: '/images/new_arrival_4.png', badge_discount: '58% OFF', badge_new: true, in_stock: true, created_at: '' },
  { id: '5', name: 'Campus Rolltop', category_id: '', original_price: 1299, sale_price: 599, image_url: '/images/all.jpg', badge_discount: '54% OFF', badge_new: false, in_stock: true, created_at: '' },
  { id: '6', name: 'Classy Hand Bags', category_id: '', original_price: 1799, sale_price: 799, image_url: '/images/ladies.jpg', badge_discount: '55% OFF', badge_new: true, in_stock: true, created_at: '' },
  { id: '7', name: 'Pro Trolley 24"', category_id: '', original_price: 3999, sale_price: 1599, image_url: '/images/trolleyyy.jpg', badge_discount: '60% OFF', badge_new: false, in_stock: true, created_at: '' },
  { id: '8', name: 'Explorer Hardcase', category_id: '', original_price: 4999, sale_price: 1999, image_url: '/images/trolley.jpg', badge_discount: '60% OFF', badge_new: true, in_stock: true, created_at: '' },
]

function ProductCard({ product, index, onViewDetails }: { product: Product; index: number; onViewDetails: () => void }) {
  const [hovered, setHovered] = useState(false)
  const { addToCart } = useCart()
  const savings = product.original_price - product.sale_price
  const discountPct = Math.round((savings / product.original_price) * 100)

  return (
    <div
      className={`${styles.card} clay-card ${hovered ? styles.hovered : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className={styles.imgWrap}>
        <img
          src={`${product.image_url}?auto=compress&cs=tinysrgb&w=500`}
          alt={product.name}
          className={styles.img}
        />

        <div className={styles.badges}>
          {product.badge_discount && (
            <span className={styles.badgeOff}>{product.badge_discount}</span>
          )}
          {product.badge_new && (
            <span className={styles.badgeNew}>NEW</span>
          )}
        </div>

        <div className={styles.overlay}>
          <button 
            className={`${styles.viewDetailsBtn} clay-btn`}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
          >
            VIEW DETAILS
          </button>
          <button 
            className={`${styles.quickAdd} clay-btn clay-btn-accent`}
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                id: product.id,
                name: product.name,
                price: product.sale_price,
                image_url: product.image_url
              });
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            QUICK ADD TO CART
          </button>
        </div>
      </div>

      <div className={styles.info}>
        <span className={styles.name}>{product.name}</span>
        <div className={styles.pricing}>
          <span className={styles.original}>₹{product.original_price.toLocaleString('en-IN')}</span>
          <span className={styles.sale}>₹{product.sale_price.toLocaleString('en-IN')}</span>
        </div>
        <span className={styles.save}>SAVE ₹{savings.toLocaleString('en-IN')} ({discountPct}%)</span>
      </div>
    </div>
  )
}

export default function FeaturedDrop() {
  const [products, setProducts] = useState<Product[]>(FALLBACK)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setProducts(data)
      })
      .catch(err => console.error("Failed to fetch products:", err))
  }, [])

  return (
    <section id="new-arrivals" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>LIMITED TIME DEALS</span>
            <h2 className={styles.title}>
              FEATURED <span className={styles.titleAccent}>DROP</span>
            </h2>
          </div>
          <button 
            className={`clay-btn ${styles.viewAll}`}
            onClick={() => setSelectedIndex(0)}
          >
            VIEW DETAILS
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div className={styles.grid}>
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onViewDetails={() => setSelectedIndex(i)} />
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div className={styles.modalOverlay} onClick={() => setSelectedIndex(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={() => setSelectedIndex(null)}>✕</button>
            <div className={styles.modalImgWrap}>
              <img src={products[selectedIndex].image_url} alt={products[selectedIndex].name} className={styles.modalImg} />
            </div>
            <div className={styles.modalInfo}>
              <h3 className={styles.modalName}>{products[selectedIndex].name}</h3>
              <div className={styles.modalPricing}>
                <span className={styles.modalSale}>₹{products[selectedIndex].sale_price.toLocaleString('en-IN')}</span>
                <span className={styles.modalOriginal}>₹{products[selectedIndex].original_price.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.modalControls}>
                <button 
                  className={styles.modalCtrlBtn}
                  onClick={() => setSelectedIndex((selectedIndex - 1 + products.length) % products.length)}
                >
                  PREVIOUS
                </button>
                <button 
                  className={styles.modalCtrlBtn}
                  onClick={() => setSelectedIndex((selectedIndex + 1) % products.length)}
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
