import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Datos de ejemplo (en una aplicación real, esto vendría de una base de datos)
const coffees = [
  {
    id: '1',
    name: 'Café Orgánico de Nariño',
    price: 35000,
    description: 'Notas a chocolate y frutos rojos, cultivado a 2000m sobre el nivel del mar',
    image: '/images/cafe-narino.jpg',
    category: 'especial'
  },
  {
    id: '2',
    name: 'Café del Huila',
    price: 28000,
    description: 'Sabor balanceado con notas cítricas, cultivado por familias cafeteras',
    image: '/images/cafe-huila.jpg',
    category: 'grano'
  }
];

// Rutas
app.get('/api/coffees', (req, res) => {
  res.json(coffees);
});

app.get('/api/coffees/:id', (req, res) => {
  const coffee = coffees.find(c => c.id === req.params.id);
  if (coffee) {
    res.json(coffee);
  } else {
    res.status(404).json({ message: 'Café no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});