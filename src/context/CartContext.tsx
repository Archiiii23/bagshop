import { createContext, useContext, useState, type ReactNode } from 'react'

export type CartItem = {
  id: string
  name: string
  price: number
  image_url: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  isPaymentOpen: boolean
  setIsPaymentOpen: (isOpen: boolean) => void
  isSuccessOpen: boolean
  setIsSuccessOpen: (isOpen: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(current => {
      const existing = current.find(i => i.id === newItem.id)
      if (existing) {
        return current.map(i =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...current, { ...newItem, quantity: 1 }]
    })
    setIsCartOpen(true) // Auto open cart when adding
  }

  const removeFromCart = (id: string) => {
    setItems(current => current.filter(i => i.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }
    setItems(current =>
      current.map(i => (i.id === id ? { ...i, quantity } : i))
    )
  }

  const clearCart = () => setItems([])

  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        isPaymentOpen,
        setIsPaymentOpen,
        isSuccessOpen,
        setIsSuccessOpen
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
