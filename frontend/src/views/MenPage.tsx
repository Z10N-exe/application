import { useQuery } from '@tanstack/react-query';
import { listProducts } from '../lib/api.js';
import { Link } from 'react-router-dom';

export function MenPage() {
  const { data, isLoading } = useQuery({ queryKey: ['men'], queryFn: () => listProducts({ excludeCategory: 'Women', page: 1, pageSize: 24 }) });
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold">Men</h1>
        <p className="text-neutral-600">Performance footwear designed for daily training and competition.</p>
      </div>
      {isLoading && <div>Loading...</div>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(data?.items ?? []).map((p) => (
          <Link to={`/products/${p.id}`} key={p.id} className="group block">
            {p.images?.[0]?.url && (
              <div className="aspect-[4/3] overflow-hidden rounded border bg-white">
                <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
            )}
            <div className="mt-2">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-neutral-600">{p.brand} • {p.category}</div>
              <div className="text-sm">${p.price.toFixed(2)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
