import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 不做任何路由重定向，让 next-intl 通过 cookie 处理本地化
  return;
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - static files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};

