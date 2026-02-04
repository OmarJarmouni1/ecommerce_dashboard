import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token')?.value;
    const { pathname } = request.nextUrl;

    // Define public routes that don't require auth
    const publicRoutes = ['/login', '/register', '/', '/auth'];
    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith('/auth/'));

    // Define protected routes (explicitly or implicitly all except public)
    // We'll treat everything as protected by default except publicRoutes and static files
    const isExcluded = pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.');

    if (isExcluded) {
        return NextResponse.next();
    }

    if (token) {
        // If authenticated and trying to access login/register, redirect to dashboard
        if (pathname === '/login' || pathname === '/register') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    } else {
        // If not authenticated and trying to access protected route, redirect to login
        if (!isPublicRoute) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
