'use client';

import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { Coffee } from '../types';

interface CoffeeCardProps extends Coffee {}

export default function CoffeeCard({ id, name, price, description, image, category }: CoffeeCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, price, description, image, category });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48">
        <Image 
          src={image} 
          alt={name} 
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-brown-900">{name}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <p className="text-brown-800 font-bold mt-2">
          ${price.toLocaleString('es-CO')} COP
        </p>
        <button 
          onClick={handleAddToCart}
          className="mt-4 bg-brown-600 text-white px-4 py-2 rounded hover:bg-brown-700 w-full transition duration-200"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}