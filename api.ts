export async function fetchMenuItems() {
    // Using relative URL for API requests
    const response = await fetch('/api/menuitems');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch menu items: ${response.status}`);
    }
    
    return response.json();
  }
  
  export async function fetchOrders() {
    const response = await fetch('/api/orders');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`);
    }
    
    return response.json();
  }
  
  export async function fetchOrderById(id: string) {
    const response = await fetch(`/api/orders/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch order: ${response.status}`);
    }
    
    return response.json();
  }
  
  export async function submitOrder(orderData: any) {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to submit order: ${response.status}`);
    }
    
    return response.json();
  }