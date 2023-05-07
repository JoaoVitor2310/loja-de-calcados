import express from 'express';
import products from './data/Products.js';
import dotenv from 'dotenv'
import connectDatabse from './config/MongoDb.js';

dotenv.config();
connectDatabse();

const app = express();


//Load main products
app.get('/api', (req, res) =>{
    res.send('API!');
})

app.get('/api/products', (req, res) =>{
    res.json(products);
})

//Load one product
app.get('/api/products/:id', (req, res) =>{ //TÁ SEM O ID POR ENQUANTO
    const product = products.find((p) => p._id === req.params.id)
    res.json(product);
})



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor online na porta ${port}`);
})