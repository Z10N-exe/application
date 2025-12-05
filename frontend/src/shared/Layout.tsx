import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useCart } from './CartContext.js';

export function Layout() {
  const authed = !!localStorage.getItem('token');
  const { cartCount } = useCart();
  const { pathname } = useLocation();
  const isAuthPage = pathname === '/signup' || pathname === '/signin';
  const isProductDetail = pathname.startsWith('/products/') && pathname !== '/products';
  return (
    <div className="min-h-screen bg-white text-black">
      {!isAuthPage && (
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <NavLink to="/products" className="flex items-center gap-2">
            <img src="/nike.jpg" alt="Logo" className="h-5 w-auto" />
          </NavLink>
          {authed ? (
            <nav className="hidden md:flex items-center gap-6">
              <NavLink to="/men" className={({isActive}) => isActive ? 'font-semibold' : ''}>Men</NavLink>
              <NavLink to="/women" className={({isActive}) => isActive ? 'font-semibold' : ''}>Women</NavLink>
              <NavLink to="/kids" className={({isActive}) => isActive ? 'font-semibold' : ''}>Kids</NavLink>
              <NavLink to="/collections" className={({isActive}) => isActive ? 'font-semibold' : ''}>Collections</NavLink>
              <NavLink to="/contact" className={({isActive}) => isActive ? 'font-semibold' : ''}>Contact</NavLink>
            </nav>
          ) : (
            <nav className="flex items-center gap-4">
              <NavLink to="/products" className={({isActive}) => isActive ? 'font-semibold' : ''}>Products</NavLink>
              <NavLink to="/signup" className={({isActive}) => isActive ? 'font-semibold' : ''}>Sign Up</NavLink>
              <NavLink to="/signin" className={({isActive}) => isActive ? 'font-semibold' : ''}>Sign In</NavLink>
            </nav>
          )}
          <div className="flex items-center gap-6">
            {isProductDetail && <NavLink to="/products">Search</NavLink>}
            <NavLink to="/cart">My Cart ({cartCount})</NavLink>
          </div>
        </header>
      )}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
