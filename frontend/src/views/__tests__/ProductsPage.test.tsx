import { describe, it, expect, vi } from 'vitest';
import { ProductsPage } from '../ProductsPage.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as api from '../../lib/api.js';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const qc = new QueryClient();

describe('ProductsPage filters', () => {
  it('calls server-side search when typing', async () => {
    const spy = vi.spyOn(api, 'listProducts').mockResolvedValue({ total: 1, page: 1, pageSize: 20, items: [
      { id: 1, name: 'Nike Dunk Low', description: 'desc', price: 120, category: 'Lifestyle', brand: 'Nike', rating: 4.2, stock: 10, images: [{ id: 1, url: '/sample.jpg' }] },
    ] } as any);

    render(
      <QueryClientProvider client={qc}>
        <MemoryRouter>
          <ProductsPage />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const input = await screen.findByPlaceholderText('Search');
    await userEvent.clear(input);
    await userEvent.type(input, 'dunk');

    expect(spy).toHaveBeenCalled();
  });
});
