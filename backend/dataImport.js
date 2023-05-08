import express from 'express';
import asyncHandler from 'express-async-handler';

import users from './data/Users.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import products from './data/Products.js';

const importData = express.Router();

importData.post('/user',
    asyncHandler(async (req, res) => {
        try {
            // await User.remove({});
            const importUser = await User.insertMany(users);
            res.send({ importUser });
        } catch (error) {
            console.log(error)
        }
    }));

importData.post('/products',
    asyncHandler(async (req, res) => {
        try {
            // await User.remove({});
            const importProducts = await Product.insertMany(products);
            res.send({ importProducts });
        } catch (error) {
            console.log(error)
        }
    }));

// app.get('/api/products', (req, res) =>{
//     res.json(products);
// })

// //Load one product
// app.get('/api/products/:id', (req, res) =>{ //TÁ SEM O ID POR ENQUANTO
//     const product = products.find((p) => p._id === req.params.id)
//     res.json(product);
// })


export default importData;