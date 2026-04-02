/** Same-origin `/api/*` routes (Next.js Route Handlers). */
async function parseJson(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function fetchProducts() {
  const res = await fetch('/api/products', { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to load products');
  return parseJson(res);
}

export async function fetchProduct(id) {
  const res = await fetch(`/api/products/${id}`, { credentials: 'include' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to load product');
  return parseJson(res);
}

export async function fetchCart() {
  const res = await fetch('/api/cart', { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to load cart');
  return parseJson(res);
}

export async function postCartItem(productId, quantity = 1) {
  const res = await fetch('/api/cart/items', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!res.ok) throw new Error('Could not add to cart');
  return parseJson(res);
}

export async function patchCartItem(productId, quantity) {
  const res = await fetch(`/api/cart/items/${productId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error('Could not update cart');
  return parseJson(res);
}

export async function deleteCartItem(productId) {
  const res = await fetch(`/api/cart/items/${productId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Could not remove item');
  return parseJson(res);
}

export async function clearCart() {
  const res = await fetch('/api/cart', {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Could not clear cart');
  return parseJson(res);
}
