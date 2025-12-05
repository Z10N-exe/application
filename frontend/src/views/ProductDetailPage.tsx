import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProduct, listProducts } from '../lib/api.js';
import { useState } from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { useCart } from '../shared/CartContext.js';

export function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, isLoading } = useQuery({ queryKey: ['product', id], queryFn: () => getProduct(Number(id)) });
  const [selected, setSelected] = useState(0);
  const [fav, setFav] = useState(false);
  const [size, setSize] = useState<string | null>(null);
  const sizes = ['5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','11','12'];
  const { addItem } = useCart();

  const { data: suggestions } = useQuery({
    queryKey: ['suggestions', product?.category],
    queryFn: () => listProducts({ category: product?.category ?? undefined, page: 1, pageSize: 8 }),
    enabled: !!product?.category,
  });

  if (isLoading || !product) return <div>Loading...</div>;

  const mainImage = product.images?.[selected]?.url ?? product.images?.[0]?.url;

  return (
    <div className="space-y-12 pb-24 md:pb-0">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="grid grid-cols-[80px_1fr] gap-4">
          <div className="flex md:flex-col gap-2 overflow-auto">
            {product.images?.map((img, idx) => (
              <button key={img.id} onClick={() => setSelected(idx)} className={`border rounded ${selected === idx ? 'ring-2 ring-black' : ''}`}>
                <img src={img.url} alt={`thumb-${idx}`} className="w-20 h-20 object-cover rounded" />
              </button>
            ))}
          </div>
          <div className="border rounded">
            {mainImage && <img src={mainImage} alt={product.name} className="w-full aspect-[4/3] object-cover rounded" />}
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          <div className="text-neutral-600">{product.brand} • {product.category}</div>
          <div className="text-xl">${product.price.toFixed(2)}</div>
          <div className="flex items-center gap-2">
            <div>Rating: {product.rating} / 5</div>
            <button type="button" className={`ml-4 rounded-full border px-3 py-2 inline-flex items-center gap-2 ${fav ? 'bg-black text-white' : ''}`} onClick={() => setFav(v => !v)}>
              <Heart className="w-4 h-4" /> Favorite
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Select Size</div>
              <button className="text-sm underline" type="button">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
              {sizes.map(s => (
                <button key={s} type="button" onClick={() => setSize(s)} className={`border rounded px-3 py-2 text-sm ${size === s ? 'ring-2 ring-black' : ''}`}>{s}</button>
              ))}
            </div>
          </div>
          <div className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</div>
          <div className="hidden md:flex gap-3">
            <button className="rounded-full px-5 py-3 bg-black text-white disabled:opacity-50" disabled={product.stock === 0} onClick={() => addItem({ id: product.id })}>Add to Bag</button>
          </div>
          <div className="divide-y border rounded">
            <details className="p-4" open>
              <summary className="cursor-pointer inline-flex items-center gap-2"><ChevronDown className="w-4 h-4" /> Product Details</summary>
              <p className="mt-2 text-neutral-700">{product.description}</p>
              <ul className="mt-2 list-disc pl-5 text-neutral-700">
                <li>Padded collar</li>
                <li>Foam midsole</li>
                <li>Visible Air unit</li>
              </ul>
            </details>
            <details className="p-4">
              <summary className="cursor-pointer inline-flex items-center gap-2"><ChevronDown className="w-4 h-4" /> Shipping & Returns</summary>
              <p className="mt-2 text-neutral-700">Free standard shipping for orders over $50. 30-day returns.</p>
            </details>
            <details className="p-4">
              <summary className="cursor-pointer inline-flex items-center gap-2"><ChevronDown className="w-4 h-4" /> Reviews ({product.rating})</summary>
              <p className="mt-2 text-neutral-700">Customer reviews coming soon.</p>
            </details>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(suggestions?.items ?? []).slice(0, 3).map(p => (
            <Link key={p.id} to={`/products/${p.id}`} className="border rounded p-3 block">
              {p.images?.[0]?.url && <img src={p.images[0].url} alt={p.name} className="w-full aspect-[4/3] object-cover rounded" />}
              <div className="mt-2 font-semibold">{p.name}</div>
              <div className="text-sm text-neutral-600">{p.brand}</div>
              <div className="text-sm">${p.price.toFixed(2)}</div>
            </Link>
          ))}
        </div>
      </div>
      <div className="fixed md:hidden bottom-0 left-0 right-0 border-t bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="font-semibold">${product.price.toFixed(2)}</div>
          <button className="flex-1 rounded-full px-5 py-3 bg-black text-white disabled:opacity-50" disabled={product.stock === 0} onClick={() => addItem({ id: product.id })}>Add to Bag</button>
        </div>
      </div>
    </div>
  );
}
