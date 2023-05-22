import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import products from './data/Products.js';
import connectDatabse from './config/MongoDb.js';
import importData from './dataImport.js';
import productRoutes from './Routes/productRoutes.js';
import { errorHandler, notFound } from './middlewares/errors.js';
import userRoutes from './Routes/userRoutes.js';
import orderRoutes from './Routes/orderRoutes.js';

dotenv.config();
connectDatabse();

const app = express();
app.use(express.json());

//CORS
app.use(cors());

//Api
app.use('/api/import', importData);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT)
});

app.get('/', (req, res) => {
    res.send('API!');
})

//Error middlewares
app.use(notFound);
app.use(errorHandler);

// Load main products

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor online na porta ${port}`);
})