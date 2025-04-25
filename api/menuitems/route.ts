export async function GET() {
    try {
      const response = await fetch('http://localhost:8080/api/menuitems');
      
      if (!response.ok) {
        return new Response(JSON.stringify({ error: 'Failed to fetch menu items' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const data = await response.json();
      
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }