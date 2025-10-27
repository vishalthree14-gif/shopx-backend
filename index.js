const express = require('express');
require('dotenv').config();
const sequelize = require('./db');
const cors = require('cors');

const app = express();


app.use(cors({
  origin: 'http://localhost:5173',  // React app URL
  credentials: true,                // 👈 must be true
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


// cart routes
const cartRoutes = require('./routes/cartRoutes');
app.use('/api/carts', cartRoutes);

// order routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

// product routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);


const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);




// Sync database and start server
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
});
