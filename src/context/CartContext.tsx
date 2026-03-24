import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  sku: string;
  category: string;
  name: Record<string, string>;
  description: Record<string, string>;
  price: {
    amount: number;
    currency: string;
  };
  quantity: number;
  tags: Record<string, string[]>;
  materials: Record<string, string[]>;
  images: string[];
  variations: {
    type: string;
    name: Record<string, string> | string;
    values: Record<string, string[]> | string[];
  }[];
  attributes?: {
    measurements: Record<string, string>;
    model_info: {
      height: string;
      wearing_size: string;
    };
    care: string[];
  };
}

interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, color: string, size: string) => void;
  removeFromCart: (id: string, color: string, size: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, color: string, size: string) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColor === color && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedColor === color && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedColor: color, selectedSize: size }];
    });
  };

  const removeFromCart = (id: string, color: string, size: string) => {
    setItems(prev => prev.filter(item => !(item.id === id && item.selectedColor === color && item.selectedSize === size)));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
