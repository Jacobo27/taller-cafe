'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Cart, CartItem, Coffee } from '../types';

interface CartContextType {
  cart: Cart;
  addToCart: (coffee: Coffee) => void;
  removeFromCart: (coffeeId: string) => void;
  updateQuantity: (coffeeId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Coffee }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { coffeeId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const initialState: Cart = {
  items: [],
  total: 0,
};

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(
        item => item.coffee.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.coffee.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price,
        };
      }

      return {
        ...state,
        items: [...state.items, { coffee: action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
      };
    }

    case 'REMOVE_FROM_CART': {
      const itemToRemove = state.items.find(
        item => item.coffee.id === action.payload
      );
      if (!itemToRemove) return state;

      return {
        ...state,
        items: state.items.filter(item => item.coffee.id !== action.payload),
        total: state.total - (itemToRemove.coffee.price * itemToRemove.quantity),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { coffeeId, quantity } = action.payload;
      const item = state.items.find(item => item.coffee.id === coffeeId);
      if (!item) return state;

      if (quantity === 0) {
        return {
          ...state,
          items: state.items.filter(item => item.coffee.id !== coffeeId),
          total: state.total - (item.coffee.price * item.quantity),
        };
      }

      const quantityDiff = quantity - item.quantity;
      return {
        ...state,
        items: state.items.map(item =>
          item.coffee.id === coffeeId
            ? { ...item, quantity }
            : item
        ),
        total: state.total + (item.coffee.price * quantityDiff),
      };
    }
    case 'CLEAR_CART': {
      return initialState;
    }

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (coffee: Coffee) => {
    dispatch({ type: 'ADD_TO_CART', payload: coffee });
  };

  const removeFromCart = (coffeeId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: coffeeId });
  };

  const updateQuantity = (coffeeId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { coffeeId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
}