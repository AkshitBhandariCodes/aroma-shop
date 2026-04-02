import { ensureCart } from '@/lib/cart';
import { getSession } from '@/lib/session';
import { findUserByEmail, registerUser } from '@/lib/users';

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { email, password, name, phone } = body;
  const e = String(email || '').trim().toLowerCase();
  const p = String(password || '');
  const n = String(name || '').trim() || 'Guest';
  const ph = String(phone || '').trim();

  if (!e || !p) {
    return Response.json({ message: 'Email and password are required.' }, { status: 400 });
  }

  if (!ph) {
    return Response.json({ message: 'Phone number is required.' }, { status: 400 });
  }

  if (findUserByEmail(e)) {
    return Response.json({ message: 'An account with this email already exists.' }, { status: 409 });
  }

  const user = {
    id: `u_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    email: e,
    password: p,
    name: n,
    phone: ph,
    createdAt: new Date().toISOString(),
  };
  registerUser(user);

  const session = await getSession();
  session.user = { id: user.id, email: user.email, name: user.name, phone: user.phone };
  ensureCart(session);
  await session.save();

  return Response.json(
    {
      message: 'Registration successful.',
      user: { id: user.id, email: user.email, name: user.name, phone: user.phone },
    },
    { status: 201 }
  );
}
