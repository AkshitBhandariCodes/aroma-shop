import { cartResponse, ensureCart } from '@/lib/cart';
import { getSession } from '@/lib/session';

export async function PATCH(request, context) {
  const { productId: productIdParam } = await context.params;
  const pid = Number(productIdParam);
  const body = await request.json().catch(() => ({}));
  const { quantity } = body;
  const qty = Math.min(99, Math.max(0, Number(quantity)));
  const session = await getSession();
  const cart = ensureCart(session);
  const line = cart.items.find((i) => i.productId === pid);
  if (!line) {
    return Response.json({ error: 'Line not found' }, { status: 404 });
  }
  if (qty === 0) {
    cart.items = cart.items.filter((i) => i.productId !== pid);
  } else {
    line.quantity = qty;
  }
  await session.save();
  return Response.json(cartResponse(cart.items));
}

export async function DELETE(_request, context) {
  const { productId: productIdParam } = await context.params;
  const pid = Number(productIdParam);
  const session = await getSession();
  const cart = ensureCart(session);
  cart.items = cart.items.filter((i) => i.productId !== pid);
  await session.save();
  return Response.json(cartResponse(cart.items));
}
