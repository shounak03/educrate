
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { USER_LOGIN_REDIRECT, ADMIN_LOGIN_REDIRECT, publicRoutes } from '@/route';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';
import { user } from './authSession';



export default auth(async (request) => {

    const userRole = await user();


    
    const isAuthenticated = !!request.auth;

    
    const path = request.nextUrl.pathname

  


  // Check for API routes - block all access
  if (path.startsWith('/api')) {
    return NextResponse.redirect(new URL('/', request.url))
  }


  if (!isAuthenticated) {

    if (path.startsWith(`/courses/`)) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }


    if (publicRoutes.some(route => path.startsWith(route))) {
      return NextResponse.next()
    }


    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (path.startsWith('/admin')) {

    if (userRole !== 'creator') {
      return NextResponse.redirect(new URL('/', request.url))
    }


    if (path === '/admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }


  return NextResponse.next()
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
    runtime: "nodejs",
    unstable_allowDynamic: [
        // allows a single file
        "/src/db/lib/dbConnect.js",
        // use a glob to allow anything in the function-bind 3rd party module
        "/node_modules/mongoose/dist/**",
    ],
};