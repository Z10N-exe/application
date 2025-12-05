import { useQuery } from '@tanstack/react-query';
import { listProducts } from '../lib/api.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export function ProductsPage() {
  const [filters, setFilters] = useState({ search: '', gender: '', kids: '', price: '', shoeHeight: '', sport: '', inStock: '' });
  const { data, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => listProducts({
      search: filters.search || undefined,
      category: filters.sport || undefined,
      brand: undefined,
      minPrice: filters.price ? Number(filters.price.split('-')[0]) : undefined,
      maxPrice: filters.price ? Number(filters.price.split('-')[1]) : undefined,
      inStock: filters.inStock ? filters.inStock === 'true' : undefined,
      page: 1,
      pageSize: 12,
    }),
  });

  const items = data?.items ?? [];
  return (
    <div className="grid md:grid-cols-[280px,1fr] gap-8">
      <aside className="hidden md:block">
        <div className="space-y-6">
          <div>
            <div className="font-semibold">New (500)</div>
            <div className="mt-3 space-y-2 text-sm text-neutral-700">
              <button className="block text-left w-full">Low Top</button>
              <button className="block text-left w-full">High Top</button>
              <button className="block text-left w-full">Skateboarding</button>
              <button className="block text-left w-full">Nike by You</button>
              <button className="block text-left w-full">Unisex</button>
            </div>
          </div>
          <div>
            <div className="font-semibold">Gender</div>
            <div className="mt-3 space-y-2 text-sm">
              {['Men','Women','Unisex'].map(g => (
                <label key={g} className="flex items-center gap-2"><input type="checkbox" onChange={() => setFilters(f=>({...f, gender: g}))}/> {g}</label>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold">Kids</div>
            <div className="mt-3 space-y-2 text-sm">
              {['Boys','Girls'].map(k => (
                <label key={k} className="flex items-center gap-2"><input type="checkbox" onChange={() => setFilters(f=>({...f, kids: k}))}/> {k}</label>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold">Shop By Price</div>
            <div className="mt-3 space-y-2 text-sm">
              {['25-50','50-100','100-150','150-300'].map(p => (
                <label key={p} className="flex items-center gap-2"><input name="price" type="radio" onChange={() => setFilters(f=>({...f, price: p}))}/> ${p.replace('-', ' - $')}</label>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold">Shoe Height</div>
            <div className="mt-3 space-y-2 text-sm">
              {['Low','Mid','High'].map(h => (
                <label key={h} className="flex items-center gap-2"><input type="checkbox" onChange={() => setFilters(f=>({...f, shoeHeight: h}))}/> {h}</label>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold">Sports</div>
            <div className="mt-3 space-y-2 text-sm">
              {['Lifestyle','Skateboarding','Training'].map(s => (
                <label key={s} className="flex items-center gap-2"><input type="checkbox" onChange={() => setFilters(f=>({...f, sport: s}))}/> {s}</label>
              ))}
            </div>
          </div>
        </div>
      </aside>
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <button className="underline">Hide Filters</button>
          </div>
          <div className="text-sm">Sort By</div>
        </div>
        {isLoading && <div>Loading products...</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <Link to={`/products/${p.id}`} key={p.id} className="border rounded-xl overflow-hidden">
              <div className="relative bg-neutral-100 aspect-[4/3]">
                {p.images?.[0] && <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" />}
                <span className="absolute left-3 top-3 text-xs bg-red-500 text-white px-2 py-1 rounded">Best Seller</span>
              </div>
              <div className="p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-se