import { cartResponse, ensureCart } from '@/lib/cart';
import { getSession } from '@/lib/session';

export async function GET() {
  const session = await getSession();
  const hadCart = Boolean(session.cart);
  const cart = ensureCart(session);
  if (!hadCart) {
    await session.save();
  }
  return Response.json(cartResponse(cart.items));
}

export async function DELETE() {
  const session = await getSession();
  session.cart = { items: [] };
  await session.save();
  return Response.json({ items: [], subtotal: 0 });
}
