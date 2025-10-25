import Image from "next/image";
import CoffeeCard from "./components/CoffeeCard";

const featuredCoffees = [
  {
    id: '1',
    name: 'Café Orgánico de Nariño',
    price: 35000,
    description: 'Notas a chocolate y frutos rojos, cultivado a 2000m sobre el nivel del mar',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?q=80&w=800&h=600&fit=crop',
    category: 'especial' as const
  },
  {
    id: '2',
    name: 'Café del Huila',
    price: 28000,
    description: 'Sabor balanceado con notas cítricas, cultivado por familias cafeteras',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&h=600&fit=crop',
    category: 'grano' as const
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-brown-50">
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brown-900 mb-4">
            Bienvenido a nuestra Tienda de Café Artesanal
          </h1>
          <p className="text-xl text-brown-700">
            Descubre los mejores cafés de Colombia
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-brown-800">Cafés Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCoffees.map((coffee) => (
              <CoffeeCard key={coffee.id} {...coffee} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
