import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // const token = request.cookies.get('access_token')?.value;
  //   console.log('token', token);
  // if (!token) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/admin/:path*", "/dashboard/:path*", "/account/:path*"], // protect these routes
// };