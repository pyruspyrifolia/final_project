'use client'
import React from 'react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import Image from "next/image";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image 
          src={item.imageurl} 
          alt={item.name}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
          <p className="text-lg font-bold text-orange-600">${item.price.toFixed(2)}</p>
        </div>
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className={`px-2 py-1 text-xs rounded-full ${item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {item.available ? 'Available' : 'Sold Out'}
          </span>
          <button className="bg-orange-500 hover:bg-orange-600 text-white py-1 px-4 rounded text-sm transition-colors duration-300">
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
}