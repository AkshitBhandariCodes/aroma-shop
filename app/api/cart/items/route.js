import { cartResponse, ensureCart } from '@/lib/cart';
import { findProduct } from '@/lib/products';
import { getSession } from '@/lib/session';

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { productId, quantity = 1 } = body;
  const p = findProduct(productId);
  if (!p) {
    return Response.json({ error: 'Invalid product' }, { status: 400 });
  }
  const qty = Math.min(99, Math.max(1, Number(quantity) || 1));
  const session = await getSession();
  const cart = ensureCart(session);
  const existing = cart.items.find((i) => i.productId === p.id);
  if (existing) {
    existing.quantity = Math.min(99, existing.quantity + qty);
  } else {
    cart.items.push({ productId: p.id, quantity: qty });
  }
  await session.save();
  return Response.json(cartResponse(cart.items));
}
