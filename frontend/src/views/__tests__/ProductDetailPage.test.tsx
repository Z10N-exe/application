import { describe, it, expect, vi } from 'vitest';
import { ProductDetailPage } from '../ProductDetailPage.js';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as api from '../../lib/api.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '../../shared/CartContext.js';

const qc = new QueryClient();

describe('ProductDetailPage interactions', () => {
  it('selects size and adds to bag', async () => {
    vi.spyOn(api, 'getProduct').mockResolvedValue({
      id: 1,
      name: 'Nike Air Max 90',
      description: 'desc',
      price: 140,
      category: 'Lifestyle',
      brand: 'Nike',
      rating: 4.5,
      stock: 10,
      images: [{ id: 1, url: '/sample.jpg' }],
    } as any);
    vi.spyOn(api, 'listProducts').mockResolvedValue({ total: 0, page: 1, pageSize: 3, items: [] } as any);

    render(
      <QueryClientProvider client={qc}>
        <CartProvider>
          <MemoryRouter initialEntries={["/products/1"]}>
            <Routes>
              <Route path="/products/:id" element={<ProductDetailPage />} />
            </Routes>
          </MemoryRouter>
        </CartProvider>
      </QueryClientProvider>
    );

    const sizeBtn = await screen.findByRole('button', { name: '7' });
    await userEvent.click(sizeBtn);

    const addMobile = await screen.findByText(/Add to Bag/i);
    await userEvent.click(addMobile);

    const raw = localStorage.getItem('cart');
    expect(raw).toContain('1');
  });
});
