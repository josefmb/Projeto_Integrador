import express from "express";
import asyncHandler from "express-async-handler";
import Product from "./../models/productModel.js";


const productRoute = express.Router();


productRoute.get(
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
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);


productRoute.get(
  "/all",
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 });
    res.json(products);
  })
);


productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Produto não encontrado");
    }
  })
);


productRoute.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Produto deletado" });
    } else {
      res.status(404);
      throw new Error("Produto não encontrado");
    }
  })
);


productRoute.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock, weight } = req.body;
    const productExist = await Product.findOne({ name });
    if (productExist) {
      res.status(400);
      throw new Error("Produto já existe");
    } else {
      const product = new Product({
        name,
        price,
        description,
        image,
        countInStock,
        weight
      });
      if (product) {
        const createdproduct = await product.save();
        res.status(201).json(createdproduct);
      } else {
        res.status(400);
        throw new Error("Dados do Produto inválidos");
      }
    }
  })
);


productRoute.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock, weight } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.countInStock = countInStock || product.countInStock;
      product.weight = weight || product.weight;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Produto não encontrado");
    }
  })
);
export default productRoute;
