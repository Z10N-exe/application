import { Outlet, NavLink } from 'react-router-dom';
import { Search, ShoppingCart } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-6">
          <div className="w-8 h-8 rounded-md bg-black" />
          <nav className="hidden md:flex gap-6 text-sm">
            <NavLink to="/products" className={({isActive}) => isActive ? 'font-semibold' : ''}>Men</NavLink>
            <NavLink to="/products" className={({isActive}) => isActive ? 'font-semibold' : ''}>Women</NavLink>
         