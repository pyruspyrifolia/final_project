'use client'
import { useEffect, useState } from 'react';
import { MenuItem } from '../types';
import MenuItemCard from '../components/menuitem';

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menuitems'); 
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError('Error loading menu items. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMenuItems();
  }, []);
  
  if (loading) {
    return <div className="flex justify-center p-12">Loading menu...</div>;
  }
  
  if (error) {
    return <div className="text-red-500 p-12 text-center">{error}</div>;
  }

  const displayCategories = ['entrees', 'sushi', 'pho', 'desserts'];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Menu</h1>
      
      {displayCategories.map(category => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 capitalize">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems
              .filter(item => item.category === category)
              .map(item => (
                <MenuItemCard key={item.id} item={item} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}