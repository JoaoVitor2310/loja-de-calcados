import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const productRoutes = express.Router();

productRoutes.get('/',
    asyncHandler(async (req, res) => {
        const products = await Product.find({});
        res.json(products);
}))


export default productRoutes;