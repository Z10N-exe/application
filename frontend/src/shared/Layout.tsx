import { Outlet, NavLink } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <NavLink to="/products" className="font-bold text-xl">Nike</NavLink>
        <nav className="flex gap-4">
          <NavLink to="/products" className={({isActive}) => isActive ? 'font-semibold' : ''}>Products</NavLink>
          <NavLink to="/signup" className={({isActive}) => isActive ? 'font-semibold' : ''}>Sign Up</NavLink>
        </nav>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

