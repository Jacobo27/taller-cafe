import Link from 'next/link';

export default function Header() {
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
          <button className="text-black hover:text-black">
            🛒 Carrito
          </button>
        </div>
      </nav>
    </header>
  );
}