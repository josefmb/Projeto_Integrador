import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import User from "./../models/userModel.js";
import generateToken from "../utils/generateToken.js";
//import sendEmail from "../utils/sendEmail.js";

import Token from "../models/userEmailToken.js";
import { mailer } from "../utils/sendEmail.js";
import crypto from "crypto";

import Address from "../models/addressModel.js";

const userRouter = express.Router();


userRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await User.countDocuments({ ...keyword });
    const users = await User.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ users, page, pages: Math.ceil(count / pageSize) });
  })
)


userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {

      if (!user.verified) {
        let token = await Token.findOne({ userId: user._id });

        if (!token) {
          token = await new Token({
            userId: user._id,
            token: generateToken(user._id),
        }).save();
      
        const url = `${process.env.BASE_URL}register/${user._id}/verify/${token.token}`;
        await mailer(user.email, "Verificação de E-mail", url);
      }

      return res.status(400).send({message: "Foi enviado um e-mail para a sua conta, por favor verifique"});
    }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Email ou Senha inválida");
    }
  })
);


userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      res.status(400);
      throw new Error("Usuário já existe");
    }

    const userToken = crypto.randomBytes(32).toString("hex");

    user = await new User({name, email, password, isAdmin, token: userToken}).save()

    if (user) {
      const token = await new Token({
        userId: user._id,
        token: userToken,
      }).save();
  
      if (token) {
        const url = `${process.env.BASE_URL}register/${user._id}/verify/${token.token}`;
        await mailer(user.email, "Verificação de E-mail", url);
      } else {
        res.status(400);
        throw new Error("Erro ao criar token para verificação do e-mail.");
      }

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: userToken,
      });
    } else {
      res.status(400);
      throw new Error("Dados do Usuário inválidos");
    }
  })
);

userRouter.get("/:id/verify/:token", asyncHandler(async(req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user)
      return res.status(400).send({message: "Link Inválido"});

    user.verified = true;

    await user.save();
    
    res.status(200).send({message: "E-mail verificado com sucesso!"});
  } catch (error) {
    res.status(500);
    throw new Error("Ocorreu um erro ao validar o e-mail");
  }
})
);


userRouter.get(
  "/all",
  asyncHandler(async (req, res) => {
    const users = await User.find({}).sort({ _id: -1 });
    res.json(users);
  })
);


userRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("Usuário não encontrado");
    }
  })
);


userRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {

      const address = await Address.findOne({userId: req.params.id});

      if (address) {
        await address.deleteOne();
      }

      await user.deleteOne();
      res.json({ message: "Usuário deletado" });
    } else {
      res.status(404);
      throw new Error("Usuário não encontrado");
    }
  })
);


userRouter.get(
  "/profile",
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
      throw new Error("Usuário não encontrado");
    }
  })
);


userRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
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
      throw new Error("Usuário não encontrado");
    }
  })
);


userRouter.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      user.isAdmin = isAdmin;
      user.token = generateToken(user._id)

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404);
      throw new Error("Usuário não encontrado");
    }
  })
);


userRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);


userRouter.post(
  "/:id/address",
  asyncHandler(async(req, res) => {
    // TODO, passar os membros por parâmetro mesmo
    const { address, number, city, state, postalCode, complement } = req.body;

    const newAddress = await new Address({address, number, city, state, postalCode, complement, userId: req.params.id }).save()

    if (newAddress) {
      res.status(201).json(newAddress);
    } else {
      res.status(400);
      throw new Error("Dados do Endereço do Usuário inválidos");
    }
  })
);

userRouter.get(
  "/:id/defaultAddress",
  asyncHandler(async(req, res) => {
    const address = await Address.findOne({userId: req.params.id});
    res.json(address);
  })
);

export default userRouter;
