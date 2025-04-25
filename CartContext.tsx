//The purpose of this file is to use the useContext hook to pass down
// information more easily than through props drilling(excessive passing imo)
'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
// cart item is the type of object that is being added to the cart and it's info
// such as quantity or additional instructions
// menu item is used to specify the actual object itself
import { CartItem, MenuItem } from '../types'

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: MenuItem) => void;
    removeFromCart: (item: number) => void;
    addInstructions: (itemId: number, instructions: string) => void;
    updateItemQuantity: (itemId: number, quantity: number) => void;
    getSubtotal: () => number;
    clearCart: () => void;
}


// Cart Context is used to pass the "Cart" to other components that need it
const CartContext = createContext<CartContextType | undefined>(undefined);


export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => 
    {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
    const addToCart = (item: MenuItem) => {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
        
        if (existingItem) {
          return prevItems.map(cartItem => 
            cartItem.id === item.id 
              ? { ...cartItem, quantity: cartItem.quantity + 1 } 
              : cartItem
          );
        }
        
        return [...prevItems, { ...item, quantity: 1 }];
      });
    };
  
    const removeFromCart = (itemId: number) => {
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };
  
    const updateItemQuantity = (itemId: number, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(itemId);
        return;
      }
      
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    };
  
    const addInstructions = (itemId: number, instructions: string) => {
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId ? { ...item, specialInstructions: instructions } : item
        )
      );
    };
  
    const clearCart = () => {
      setCartItems([]);
    };
  
    const getSubtotal = () => {
      return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };
  
    return (
      <CartContext.Provider value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        addInstructions,
        clearCart,
        getSubtotal
      }}>
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
  