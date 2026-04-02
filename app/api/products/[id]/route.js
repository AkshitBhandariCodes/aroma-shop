import { findProduct } from '@/lib/products';

export async function GET(_request, context) {
  const { id } = await context.params;
  const p = findProduct(id);
  if (!p) {
    return Response.json({ error: 'Product not found' }, { status: 404 });
  }
  return Response.json(p);
}
