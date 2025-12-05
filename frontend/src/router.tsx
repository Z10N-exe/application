import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './shared/Layout.js';
import { SignUpPage } from './views/SignUpPage.js';
import { SignInPage } from './views/SignInPage.js';
import { MenPage } from './views/MenPage.js';
import { WomenPage } from './views/WomenPage.js';
import { KidsPage } from './views/KidsPage.js';
import { CollectionsPage } from './views/CollectionsPage.js';
import { ContactPage } from './views/ContactPage.js';
import { CartPage } from './views/CartPage.js';
import { ProductsPage } from './views/ProductsPage.js';
import { ProductDetailPage } from './views/ProductDetailPage.js';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/signup" replace /> },
      { path: '/signup', element: <SignUpPage /> },
      { path: '/signin', element: <SignInPage /> },
      { path: '/men', element: <MenPage /> },
      { path: '/women', element: <WomenPage /> },
      { path: '/kids', element: <KidsPage /> },
      { path: '/collections', element: <CollectionsPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/products', element: <ProductsPage /> },
      { path: '/products/:id', element: <ProductDetailPage /> },
    ],
  },
]);
