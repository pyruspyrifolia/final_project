'use client'
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { cartItems } = useCart();
  const router = useRouter();
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const navItems = [
    { path: '/', label: 'Dinner and a Movie' },
    { path: '/register', label: 'Register' },
    { path: '/checkout', label: 'Checkout' },
    { path: '/orders', label: 'Past Orders' },
    { path: '/login', label: 'Login' }
  ];
  
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Dinner and a Movie
          </Link>
          <Link href="/register" className="text-xl font-bold">
            Register
          </Link>
          <Link href="/checkout" className="text-xl font-bold">
            Checkout
          </Link>
          <Link href="/orders" className="text-xl font-bold">
            Orders
          </Link>
          <Link href="/login" className="text-xl font-bold">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;