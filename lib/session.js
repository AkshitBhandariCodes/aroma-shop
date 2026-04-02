import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

const password =
  process.env.SESSION_SECRET ||
  'aroma-dev-secret-change-in-production-min-32-chars!!';

export const sessionOptions = {
  cookieName: 'aroma_session',
  password,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  },
};

/** @returns {Promise<import('iron-session').IronSession<AromaSession>>} */
export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession(cookieStore, sessionOptions);
}

/**
 * @typedef {object} AromaSession
 * @property {{ id: string, email: string, name: string } | undefined} user
 * @property {{ items: { productId: number, quantity: number }[] } | undefined} cart
 */
