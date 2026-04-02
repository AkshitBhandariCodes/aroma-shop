import { ensureCart } from '@/lib/cart';
import { getSession } from '@/lib/session';
import { findUserByEmail } from '@/lib/users';

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { email, password } = body;
  const e = String(email || '').trim().toLowerCase();
  const pw = String(password || '');

  if (!e || !pw) {
    return Response.json({ message: 'Email and password are required.' }, { status: 400 });
  }

  const user = findUserByEmail(e);
  if (!user || user.password !== pw) {
    return Response.json({ message: 'Invalid email or password.' }, { status: 401 });
  }

  const session = await getSession();
  session.user = { id: user.id, email: user.email, name: user.name, phone: user.phone };
  ensureCart(session);
  await session.save();

  return Response.json({
    message: 'Login successful.',
    user: { id: user.id, email: user.email, name: user.name, phone: user.phone },
  });
}
