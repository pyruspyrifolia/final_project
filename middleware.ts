import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for an API route
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Rewrite to the backend server
    return NextResponse.rewrite(
      new URL(request.nextUrl.pathname, 'http://localhost:8080')
    );
  }
  
  return NextResponse.next();
}