import Image from "next/image";
import CoffeeCard from "./components/CoffeeCard";

const defaultFeaturedCoffees = [
  {
    id: '1',
    name: 'Café Orgánico de Nariño',
    price: 35000,
    description: 'Notas a chocolate y frutos rojos, cultivado a 2000m sobre el nivel del mar',
    image: '/images/cafe-frutos-rojos.jpg',
    category: 'especial' as const,
    formattedPrice: `$${(35000).toLocaleString('es-CO')} COP`,
  },
  {
    id: '2',
    name: 'Café del Huila',
    price: 28000,
    description: 'Sabor balanceado con notas cítricas, cultivado por familias cafeteras',
    image: '/images/cafe-del-huila.jpg',
    category: 'grano' as const,
    formattedPrice: `$${(28000).toLocaleString('es-CO')} COP`,
  }
];

async function fetchCoffees() {
  const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
  try {
    const res = await fetch(`${base}/api/coffees`, { cache: 'no-store' });
    if (!res.ok) {
      console.warn('API responded with status', res.status);
      return defaultFeaturedCoffees;
    }
    const data = await res.json();
    return data.map((c: any) => ({
      ...c,
      formattedPrice: `$${(c.price).toLocaleString('es-CO')} COP`,
    }));
  } catch (err) {
    // Silently fail to allow SSR to continue — use fallback static data
    // Log as a warning to avoid React Dev overlay in dev.
    // eslint-disable-next-line no-console
    console.warn('fetchCoffees failed (using fallback):', err);
    return defaultFeaturedCoffees;
  }
}

export default async function Home() {
  const featuredCoffees = await fetchCoffees();
  return (
    <div className="min-h-screen bg-green-100">
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Bienvenido a nuestra Tienda de Café Artesanal
          </h1>
          <p className="text-xl text-black">
            Descubre los mejores cafés de Colombia
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-black">Cafés Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCoffees.map((coffee: any) => (
              <CoffeeCard key={coffee.id} {...coffee} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
