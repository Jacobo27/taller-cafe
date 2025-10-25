export interface Coffee {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'grano' | 'molido' | 'especial';
}

export interface CartItem {
  coffee: Coffee;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}