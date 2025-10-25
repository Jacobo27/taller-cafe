import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-brown-900 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Café Artesanal
        </Link>
        <div className="space-x-4">
          <Link href="/catalog" className="hover:text-brown-300">
            Catálogo
          </Link>
          <button className="hover:text-brown-300">
            🛒 Carrito
          </button>
        </div>
      </nav>
    </header>
  );
}