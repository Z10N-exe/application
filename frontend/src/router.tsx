import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './shared/Layout.js';
import { SignUpPage } from './views/SignUpPage.js';
import { ProductsPage } from './views/ProductsPage.js';
import { ProductDetailPage } from './views/ProductDetailPage.js';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/products" replace /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/products', element: <ProductsPage /> },
      { path: '/products/:id', element: <ProductDetailPage /> },
    ],
  },
]);

