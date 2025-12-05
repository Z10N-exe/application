import { useCart } from '../shared/CartContext.js';
import { useQueries } from '@tanstack/react-query';
import { getProduct } from '../lib/api.js';
import { Link } from 'react-router-dom';

export function CartPage() {
  const { items, removeItem, clear } = useCart();
  const queries = useQueries({
    queries: items.map((it) => ({
      queryKey: ['cart-product', it.id],
      queryFn: () => getProduct(it.id),
    })),
  });
  const products = queries.map((q) => q.data).filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">My Cart ({items.length})</h1>
        <button className="rounded-full px-5 py-2 border" onClick={() => clear()}>Clear</button>
      </div>
      {products.length === 0 && <div>Your cart is empty.</div>}
      <div className="grid grid-cols-1 gap-4">
        {products.map((p) => (
          <div key={p!.id} className="border rounded p-4 flex gap-4 items-center">
            {p!.images?.[0]?.url && <img src={p!.images[0].url} alt={p!.name} className="w-24 h-24 object-cover rounded" />}
            <div className="flex-1">
              <Link to={`/products/${p!.id}`} className="font-semibold underline">{p!.name}</Link>
              <div className="text-sm">${p!.price.toFixed(2)}</div>
            </div>
            <button className="rounded-full px-4 py-2 border" onClick={() => removeItem(p!.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
