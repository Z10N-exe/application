import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../lib/api.js';
import { useState } from 'react';

export function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, isLoading } = useQuery({ queryKey: ['product', id], queryFn: () => getProduct(Number(id)) });
  const [selected, setSelected] = useState(0);

  if (isLoading || !product) return <div>Loading...</div>;

  const mainImage = product.images?.[selected]?.url ?? product.images?.[0]?.url;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        {mainImage && <img src={mainImage} alt={product.name} className="w-full aspect-[4/3] object-cover rounded" />}
        <div className="mt-3 flex gap-2">
          {product.images?.map((img, idx) => (
            <button key={img.id} onClick={() => setSelected(idx)} className={`border rounded ${selected === idx ? 'ring-2 ring-black' : ''}`}>
              <img src={img.url} alt={`thumb-${idx}`} className="w-20 h-20 object-cover rounded" />
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="text-neutral-600">{product.brand} • {product.category}</div>
        <div className="text-xl">${product.price.toFixed(2)}</div>
        <div>Rating: {product.rating} / 5</div>
        <div className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</div>
        <p className="text-neutral-700">{product.description}</p>
        <button className="rounded-full px-5 py-3 bg-black text-white disabled:opacity-50" disabled={product.stock === 0}>Add to Cart</button>
      </div>
    </div>
  );
}

