import axios from 'axios';

export const api = axios.create({ baseURL: '/api' });

export interface ProductImage { id: number; url: string }
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
  stock: number;
  images: ProductImage[];
}

export async function signup(payload: { name: string; email: string; password: string }) {
  const { data } = await api.post('/auth/signup', payload);
  return data as { user: { id: number; name: string; email: string }; token: string };
}

export async function listProducts(params: Record<string, string | number | boolean | undefined>) {
  const { data } = await api.get('/products', { params });
  return data as { total: number; page: number; pageSize: number; items: Product[] };
}

export async function getProduct(id: number) {
  const { data } = await api.get(`/products/${id}`);
  return data as Product;
}

