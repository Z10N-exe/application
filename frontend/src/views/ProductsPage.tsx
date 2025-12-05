import { useQuery } from '@tanstack/react-query';
import { listProducts } from '../lib/api.js';
import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

export function ProductsPage() {
  const [filters, setFilters] = useState({ search: '', category: '', brand: '', minPrice: '', maxPrice: '', minRating: '', inStock: '' });
  const { data, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => listProducts({
      search: filters.search || undefined,
      category: filters.category || undefined,
      excludeCategory: 'Women',
      brand: filters.brand || undefined,
      minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
      minRating: filters.minRating ? Number(filters.minRating) : undefined,
      inStock: filters.inStock ? filters.inStock === 'true' : undefined,
      page: 1,
      pageSize: 20,
    }),
  });

  const columns = useMemo<ColumnDef<any>[]>(() => [
    { header: 'Name', accessorKey: 'name', cell: info => <Link className="underline" to={`/products/${info.row.original.id}`}>{info.getValue<string>()}</Link> },
    { header: 'Brand', accessorKey: 'brand' },
    { header: 'Category', accessorKey: 'category' },
    { header: 'Price', accessorKey: 'price', cell: info => `$${info.getValue<number>().toFixed(2)}` },
    { header: 'Rating', accessorKey: 'rating' },
    { header: 'Stock', accessorKey: 'stock' },
  ], []);

  const table = useReactTable({
    data: data?.items ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-3">
        <input className="border rounded bg-white placeholder:text-neutral-400 px-3 py-2" placeholder="Search" value={filters.search} onChange={e => setFilters(f => ({...f, search: e.target.value}))} />
        <input className="border rounded bg-white placeholder:text-neutral-400 px-3 py-2" placeholder="Category" value={filters.category} onChange={e => setFilters(f => ({...f, category: e.target.value}))} />
        <input className="border rounded bg-white placeholder:text-neutral-400 px-3 py-2" placeholder="Brand" value={filters.brand} onChange={e => setFilters(f => ({...f, brand: e.target.value}))} />
        <input className="border rounded bg-white placeholder:text-neutral-400 px-3 py-2" placeholder="Min Price" value={filters.minPrice} onChange={e => setFilters(f => ({...f, minPrice: e.target.value}))} />
        <input className="border rounded bg-white placeholder:text-neutral-400 px-3 py-2" placeholder="Max Price" value={filters.maxPrice} onChange={e => setFilters(f => ({...f, maxPrice: e.target.value}))} />
        <input className="border rounded bg-white placeholder:text-neutral-400 px-3 py-2" placeholder="Min Rating" value={filters.minRating} onChange={e => setFilters(f => ({...f, minRating: e.target.value}))} />
        <select className="border rounded bg-white px-3 py-2" value={filters.inStock} onChange={e => setFilters(f => ({...f, inStock: e.target.value}))} >
          <option value="">Stock: Any</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
      </div>

      {isLoading && <div>Loading products...</div>}

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
