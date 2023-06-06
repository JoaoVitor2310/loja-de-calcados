import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import emailValidator from 'deep-email-validator';

import Order from '../models/orderModel.js';
import generateToken from '../utils/generateToken.js';
import { protect } from '../middlewares/auth.js';

const orderRoutes = express.Router();

// Create order
orderRoutes.post(
  "/create",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("Não há itens no pedido.");
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    if (order) {
      res.status(201).json(order);
    } else {
      res.status(400);
      throw new Error("Dados de pedido inválidos.");
    }
    // const createOrder = await order.save();
  })
);

// Get order
orderRoutes.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate(
          "user",
          "name email"
        );

      if (order) {
        res.json(order);
      } else {
        res.status(404);
        throw new Error("Pedido não encontrado.");
      }
    } catch (error) {
      res.status(404);
      throw new Error("Pedido não encontrado.");
    }
  })
);

//Check if order is paid
orderRoutes.put(
  "/:id/pay",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    const { id, status, update_time, email_address } = req.body;
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = { 
        id, status, update_time, email_address 
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Pedido não encontrado.");
    }
  })
);

export default orderRoutes;