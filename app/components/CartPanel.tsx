 'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function CartPanel({ onClose }: { onClose?: () => void }) {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState<any | null>(null);

  const subtotal = cart.items.reduce((acc, it) => acc + it.coffee.price * it.quantity, 0);

  async function placeOrder() {
    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
      const res = await fetch(`${base}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.items,
          customer: { name: 'Sim User' },
        }),
      });
      if (!res.ok) throw new Error('order failed');
      const data = await res.json();
      setOrderResult(data);
      // clear cart after simulated order
      clearCart();
    } catch (err) {
      setOrderResult({ error: true, message: (err as Error).message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className="fixed right-4 top-16 w-96 bg-white shadow-lg rounded p-4 z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Carrito</h3>
        <button onClick={onClose} className="text-gray-500">✕</button>
      </div>
      {cart.items.length === 0 ? (
        <p className="text-sm text-gray-600">Tu carrito está vacío</p>
      ) : (
        <div className="space-y-3">
          {cart.items.map((it) => (
            <div key={it.coffee.id} className="flex items-start gap-3">
              <img src={it.coffee.image || '/images/cafe-frutos-rojos.jpg'} className="h-12 w-12 object-cover rounded" alt={it.coffee.name} />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{it.coffee.name}</p>
                    <p className="text-sm text-gray-500">${it.coffee.price.toLocaleString('es-CO')} COP</p>
                  </div>
                  <button onClick={() => removeFromCart(it.coffee.id)} className="text-sm text-red-600">Eliminar</button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQuantity(it.coffee.id, Math.max(0, it.quantity - 1))} className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span>{it.quantity}</span>
                  <button onClick={() => updateQuantity(it.coffee.id, it.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t pt-3">
            <div className="flex justify-between font-semibold"> <span>Total</span> <span>${subtotal.toLocaleString('es-CO')} COP</span></div>
            <button disabled={loading} onClick={placeOrder} className="mt-3 w-full bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">{loading ? 'Procesando...' : 'Simular pedido'}</button>
            {orderResult && (
              <div className="mt-3 p-2 text-sm bg-gray-100 rounded">
                {orderResult.error ? (
                  <p>Error: {orderResult.message}</p>
                ) : (
                  <p>Pedido simulado: <strong>{orderResult.id}</strong></p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
