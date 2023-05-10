import express from 'express';
import dotenv from 'dotenv'

import products from './data/Products.js';
import connectDatabse from './config/MongoDb.js';
import importData from './dataImport.js';
import productRoutes from './Routes/productRoutes.js';
import { errorHandler, notFound } from './middlewares/errors.js';

dotenv.config();
connectDatabse();

const app = express();

//Api
app.use('/api/import', importData);
app.use('/api/products', productRoutes);

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