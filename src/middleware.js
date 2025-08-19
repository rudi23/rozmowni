import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check if the request is for the email-preview page
  if (request.nextUrl.pathname === '/email-preview') {
    if (process.env.BASIC_AUTH_ENABLED === 'false') {
      return NextResponse.next();
    }

    // Check for basic auth header
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      // No auth header, return 401 with WWW-Authenticate header
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Email Preview"',
        },
      });
    }

    // Decode the base64 credentials
    const credentials = Buffer.from(
      authHeader.split(' ')[1],
      'base64',
    ).toString();
    const [username, password] = credentials.split(':');

    // Check credentials (you can change these)
    const validUsername = process.env.BASIC_AUTH_USER;
    const validPassword = process.env.BASIC_AUTH_PASS;

    if (
      !validUsername ||
      !validPassword ||
      username !== validUsername ||
      password !== validPassword
    ) {
      return new NextResponse('Authentication failed', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Email Preview"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/email-preview',
};
