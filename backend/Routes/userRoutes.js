import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import emailValidator from 'deep-email-validator';

import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import { protect } from '../middlewares/auth.js';

const userRoutes = express.Router();

userRoutes.post(
    "/register",
    asyncHandler(async (req, res) => {
        const { name, email, password, confirmPassword } = req.body;

        const userExists = await User.findOne({ email });

        let passwordsMatch = false;
        password === confirmPassword ? passwordsMatch = true : passwordsMatch = false;

        if (name.length > 70) {
            res.status(400);
            throw new Error("O nome deve ter menos de 71 caracteres.");
        }

        if (userExists) {
            res.status(400);
            throw new Error("Email já cadastrado.");
        }

        let emailValidate = await emailValidator.validate(email);
        if (!emailValidate.valid) {
            res.status(400);
            throw new Error("Email inválido.");
        }

        if (password.length < 5) {
            res.status(400);
            throw new Error("A senha precisa ter 5 caracteres pelo menos.");
        }

        if (!passwordsMatch) {
            res.status(400);
            throw new Error("As senhas não são iguais.");
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: passwordHash,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error("Dados de usuário inválidos.");
        }
    })
);

//Login
userRoutes.post('/login',
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            const matchPassword = await bcrypt.compare(password, user.password);

            if (user && matchPassword) {
                res.json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id),
                    createdAt: user.createdAt,
                });

            } else {
                res.status(401);
                throw new Error("Senha incorreta.");
            }

        } else {
            res.status(401);
            throw new Error("Email não cadastrado.");
        }
    }))

// Profile
userRoutes.get('/profile',
    protect,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt,
            });
        } else {
            res.status(404);
            throw new Error("Usuário não encontrado.");
        }
    }))

//Update
userRoutes.put(
    "/profile",
    protect,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        const { name, password, confirmPassword } = req.body;

        if (user) {
            if (name) {
                if (name.length > 69) {
                    res.status(400);
                    throw new Error("O nome deve ter menos de 70 caracteres.");
                }
                user.name = name || user.name;
            }

            if (password || confirmPassword) {
                const passwordsMatch = password === confirmPassword ? true : false;
                
                if (!password) {
                    res.status(400);
                    throw new Error("Digite a senha.");
                }

                if (!confirmPassword) {
                    res.status(400);
                    throw new Error("Digite a confirmação da senha.");
                }

                if (password.length < 5) {
                    res.status(400);
                    throw new Error("A senha precisa ter pelo menos 5 caracteres.");
                }


                if (!passwordsMatch) {
                    res.status(400);
                    throw new Error("As senhas não são iguais.");
                }

                const salt = await bcrypt.genSalt();
                const passwordHash = await bcrypt.hash(password, salt);

                user.password = passwordHash;
            }

            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                createdAt: updatedUser.createdAt,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404);
            throw new Error("Você precisa estar logado.");
        }
    })
);

export default userRoutes;