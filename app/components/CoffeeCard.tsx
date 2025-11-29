 'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Coffee } from '../types';

interface CoffeeCardProps extends Coffee {
  formattedPrice?: string;
}

export default function CoffeeCard({ id, name, price, description, image, category, formattedPrice }: CoffeeCardProps) {
  const { addToCart } = useCart();
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = () => {
    addToCart({ id, name, price, description, image, category });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48 bg-white overflow-hidden">
        {!imgError && image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-black bg-white">
            <span className="text-3xl font-bold">☕</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-black">{name}</h3>
        <p className="text-black mt-2">{description}</p>
        <p className="text-black font-bold mt-2">
          {formattedPrice ?? `$${price.toLocaleString('es-CO')} COP`}
        </p>
        <button 
          onClick={handleAddToCart}
          className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 w-full transition duration-200"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}