 'use client';

import Link from 'next/link';
import { useState } from 'react';
import CartPanel from './CartPanel';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-transparent text-black p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Café Artesanal
        </Link>
        <div className="space-x-4">
          <Link href="/catalog" className="text-black hover:text-black">
            Catálogo
          </Link>
          <button onClick={() => setOpen(true)} className="text-black hover:text-black">
            🛒 Carrito
          </button>
        </div>
      </nav>
      {open && <CartPanel onClose={() => setOpen(false)} />}
    </header>
  );
}