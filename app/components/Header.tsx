 'use client';

import Link from 'next/link';
import { useState } from 'react';
import CartDrawer from './CartDrawer';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  return (
    <header className="bg-transparent text-black p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Café Artesanal
        </Link>
        <div className="space-x-4 flex items-center">
          <Link href="/catalog" className="text-black hover:text-black">
            Catálogo
          </Link>
          <button onClick={() => setOpen(true)} className="text-black hover:text-black flex items-center gap-2">
            🛒 Carrito
            <span className="ml-1 px-2 py-0.5 rounded-full bg-white text-sm text-black">{cart.items.length}</span>
          </button>
        </div>
      </nav>
      <CartDrawer isOpen={open} onClose={() => setOpen(false)} />
    </header>
  );
}