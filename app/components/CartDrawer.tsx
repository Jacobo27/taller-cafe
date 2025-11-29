"use client";

import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isPlacing, setIsPlacing] = useState(false);

  const placeOrder = async () => {
    if (cart.items.length === 0) return;
    setIsPlacing(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
      const res = await fetch(`${base}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart.items, total: cart.total }),
      });
      if (!res.ok) throw new Error('Server error');
      const json = await res.json();
      alert(`Pedido creado (simulado): ${json.orderId}`);
      // Clear the cart using context
      clearCart();
    } catch (err) {
      console.error('Place order failed', err);
      alert('Error al crear el pedido (simulado)');
    } finally {
      setIsPlacing(false);
      onClose();
    }
  };

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold">Carrito</h2>
        <button className="text-sm text-gray-600" onClick={onClose}>Cerrar</button>
      </div>
      <div className="p-4 overflow-auto h-[calc(100vh-160px)]">
        {cart.items.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          cart.items.map((item) => (
            <div key={item.coffee.id} className="flex items-center gap-4 mb-4 border-b pb-2">
              <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                {item.coffee.image ? (
                  <img src={item.coffee.image} alt={item.coffee.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center">☕</div>
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{item.coffee.name}</div>
                <div className="text-sm text-gray-600">${item.coffee.price.toLocaleString('es-CO')} COP</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.coffee.id, Math.max(0, item.quantity - 1))} className="px-2 py-1 border rounded">-</button>
                <div>{item.quantity}</div>
                <button onClick={() => updateQuantity(item.coffee.id, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold">Total</div>
          <div className="text-lg font-bold">${cart.total.toLocaleString('es-CO')} COP</div>
        </div>
        <div className="flex gap-2">
          <button disabled={isPlacing || cart.items.length === 0} className="w-full bg-green-700 text-white px-4 py-2 rounded" onClick={placeOrder}>
            {isPlacing ? 'Procesando...' : 'Realizar pedido (simulado)'}
          </button>
        </div>
      </div>
    </div>
  );
}
