'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { useForm } from 'react-hook-form';
import { CreditCardInfo } from '../../types';

export default function Checkout() {
  const { cartItems, updateItemQuantity, addInstructions, getSubtotal } = useCart();
  const router = useRouter();
  const subtotal = getSubtotal();
  const taxRate = 0.0825; // 8.25%
  const tax = subtotal * taxRate;
  const [tip, setTip] = useState(0);
  const total = subtotal + tax + tip;
  
  const { register, handleSubmit, formState: { errors } } = useForm<CreditCardInfo>();
  
  const onSubmit = async (data: CreditCardInfo) => {
    try {
      
      const orderItems = cartItems.map(item => ({
        menuItemId: item.id,
        quantity: item.quantity,
        specialInstructions: item.specialInstructions || ''
      }));
      
      const orderData = {
        items: orderItems,
        subtotal,
        tax,
        tip,
        total,
        orderDate: new Date().toISOString()
      };
      
      const response = await fetch('localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to place order');
      }
      
      const result = await response.json();      
    
      router.push(`/order/${result.id}`);
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-6">Add some delicious items to your cart before checkout!</p>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded"
        >
          Browse Menu
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-3/5">
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Order</h2>
            
            {cartItems.map((item) => (
              <div key={item.id} className="border-b py-4 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="mb-2">
                  <label htmlFor={`instructions-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions
                  </label>
                  <textarea
                    id={`instructions-${item.id}`}
                    className="w-full border rounded p-2 text-sm"
                    placeholder="E.g., Extra ketchup, Hold the mayo"
                    value={item.specialInstructions || ''}
                    onChange={(e) => addInstructions(item.id, e.target.value)}
                    rows={2}
                  />
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:w-2/5">
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  className="w-full border rounded p-2"
                  placeholder="1234 5678 9012 3456"
                  {...register("cardNumber", { 
                    required: "Card number is required",
                    pattern: {
                      value: /^[0-9]{16}$/,
                      message: "Please enter a valid 16-digit card number"
                    }
                  })}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="expiryMonth" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Month
                  </label>
                  <input
                    id="expiryMonth"
                    type="text"
                    className="w-full border rounded p-2"
                    placeholder="MM"
                    {...register("expiryMonth", { 
                      required: "Required",
                      pattern: {
                        value: /^(0[1-9]|1[0-2])$/,
                        message: "Enter a valid month (01-12)"
                      }
                    })}
                  />
                  {errors.expiryMonth && (
                    <p className="text-red-500 text-sm mt-1">{errors.expiryMonth.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="expiryYear" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Year
                  </label>
                  <input
                    id="expiryYear"
                    type="text"
                    className="w-full border rounded p-2"
                    placeholder="YY"
                    {...register("expiryYear", { 
                      required: "Required",
                      pattern: {
                        value: /^[0-9]{2}$/,
                        message: "Enter a valid 2-digit year"
                      }
                    })}
                  />
                  {errors.expiryYear && (
                    <p className="text-red-500 text-sm mt-1">{errors.expiryYear.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    id="cvv"
                    type="text"
                    className="w-full border rounded p-2"
                    placeholder="123"
                    {...register("cvv", { 
                      required: "Required",
                      pattern: {
                        value: /^[0-9]{3,4}$/,
                        message: "Enter a valid CVV"
                      }
                    })}
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Tip Amount</h3>
                <div className="flex gap-2">
                  {[0, 0.15, 0.18, 0.2, 0.25].map((tipRate) => (
                    <button
                      key={tipRate}
                      type="button"
                      className={`flex-1 py-2 px-3 border rounded ${
                        tip === subtotal * tipRate
                          ? 'bg-blue-500 text-white'
                          : 'bg-white'
                      }`}
                      onClick={() => setTip(subtotal * tipRate)}
                    >
                      {tipRate === 0 ? 'No Tip' : `${tipRate * 100}%`}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax (8.25%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Tip:</span>
                  <span>${tip.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-medium"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}