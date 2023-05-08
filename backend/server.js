import express from 'express';
import products from './data/Products.js';
import dotenv from 'dotenv'
import connectDatabse from './config/MongoDb.js';
import importData from './dataImport.js';
import productRoutes from './Routes/productRoutes.js';

dotenv.config();
connectDatabse();

const app = express();

//Api
app.use('/api/import', importData);
app.use('/api/products', productRoutes);

//Load main products
app.get('/', (req, res) => {
    res.send('API!');
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor online na porta ${port}`);
})