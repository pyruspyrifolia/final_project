export interface MenuItem {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    imageurl: string;
}

export interface CartItem extends MenuItem {
    quantity: number;
    specialInstructions?: string;
  }
  
export interface User {
    id: string;
    username: string;
    email: string;
  }
  
export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    date: string;
    status: 'pending' | 'completed' | 'cancelled';
  }

export interface CreditCardInfo {
    cardNumber: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
  }