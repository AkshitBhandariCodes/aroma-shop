import { findProduct } from './products.js';

export function enrichItems(items) {
  return items
    .map((line) => {
      const product = findProduct(line.productId);
      if (!product) return null;
      return {
        productId: line.productId,
        quantity: line.quantity,
        product,
        lineTotal: Math.round(product.price * line.quantity * 100) / 100,
      };
    })
    .filter(Boolean);
}

export function cartResponse(items) {
  const lines = enrichItems(items);
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  return { items: lines, subtotal: Math.round(subtotal * 100) / 100 };
}

export function ensureCart(session) {
  if (!session.cart) {
    session.cart = { items: [] };
  }
  return session.cart;
}
