
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import { USER_LOGIN_REDIRECT, ADMIN_LOGIN_REDIRECT,publicRoutes } from '@/route';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
 const { nextUrl } = req;

 const isAuthenticated = !!req.auth;
 const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

 if (isPublicRoute && isAuthenticated)
  return Response.redirect(new URL(USER_LOGIN_REDIRECT, nextUrl));

//  if (!isAuthenticated && !isPublicRoute)
//   return Response.redirect(new URL(ROOT, nextUrl));
});

export const config = {
 matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};