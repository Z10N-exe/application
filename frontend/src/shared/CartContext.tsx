import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type CartItem = { id: number };

type CartContextValue = {
  items: CartItem[];
  cartCount: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem('cart', JSON.stringify(items));
  window.dispatchEvent(new Event('cart:update'));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readCart());

  useEffect(() => {
    function onUpdate() { setItems(readCart()); }
    window.addEventListener('cart:update', onUpdate);
    window.addEventListener('storage', onUpdate);
    return () => {
      window.removeEventListener('cart:update', onUpdate);
      window.removeEventListener('storage', onUpdate);
    };
  }, []);

  const value = useMemo<CartContextValue>(() => ({
    items,
    cartCount: items.length,
    addItem: (item) => { const next = [...items, item]; writeCart(next); setItems(next); },
    removeItem: (id) => { const next = items.filter(i => i.id !== id); writeCart(next); setItems(next); },
    clear: () => { writeCart([]); setItems([]); },
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

