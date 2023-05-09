import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const productRoutes = express.Router();

//Get all prodcuts
productRoutes.get('/',
    asyncHandler(async (req, res) => {
        const products = await Product.find({});
        res.json(products);
    }))

// Get a specific product
productRoutes.get('/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        
        try {
            const product = await Product.findById(id);
            if (!product) {
                res.status(422);
                throw new Error('Produto não encontrado.');
            }
            res.json(product);
            
        } catch (error) {
            res.status(422);
            throw new Error('Produto não encontrado.');
        }
    }))


export default productRoutes;