import { createRequire } from "module";
const require = createRequire(import.meta.url);
let ObjectId = require("mongodb").ObjectId;

import Product from "../models/Product.js";
import User from "../models/User.js";

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(405).json({ message: err.message });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    res.status(200).json(product);
  } catch (err) {
    res.status(405).json({ message: err.message });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

export const getProductsByName = async (req, res) => {
  try {
    const { body } = req.body;

    const products = await Product.find({ name: `${body.toLowerCase()}` });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

export const getProductsByCategory = async (req, res) => {
  try {
    const { body } = req.body;

    const products = await Product.find({ category: `${body}` });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

export const editProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, category, price, numberInStock, picturePath } =
      req.body;

    const userId = req.user.id;

    const product = await Product.findById(productId);

    if (product.userId === userId) {
      const updatedProduct = await Product.findByIdAndUpdate(
        { _id: ObjectId(productId) },
        {
          userId: userId,
          name: name,
          description: description,
          category: category,
          price: price,
          numberInStock: numberInStock,
          picturePath: picturePath,
        },
        { new: true }
      );

      /*
        after the product is updated 
        i pill it from the products array in the user document
        and then push the updated product instead
      */

      await User.findOneAndUpdate(
        { _id: ObjectId(userId) },
        {
          $pull: { products: { _id: ObjectId(productId) } },
        },

        { upsert: true }
      ).exec();

      await User.findOneAndUpdate(
        { _id: ObjectId(userId) },
        {
          $push: { products: updatedProduct },
        },

        { upsert: true }
      ).exec();

      res.status(200).json(updatedProduct);
    } else {
      res.status(500).json({ message: "only the owner is allowed to edit" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const user_id = req.user.id;

    const product = await Product.findById(productId);

    if (product) {
      if (product.userId === user_id) {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        /*
           after the product is deleted 
           i pull it out of the products array in the user document
        */
        await User.updateOne(
          { _id: ObjectId(user_id) },
          { $pull: { products: { _id: ObjectId(productId) } } }
        );

        res.status(200).json({ deletedProduct });
      } else {
        res.status(404).json({ message: "only the owner can delete" });
      }
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

export const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, numberInStock, picturePath } =
      req.body;

    const userId = req.user.id;

    const newProduct = new Product({
      userId,
      name: name.toLowerCase(),
      description,
      category,
      price,
      numberInStock,
      picturePath,
    });
    await newProduct.save();

    /*
      after the product is created 
      i push it in the products array in the user document
    */
    User.findOneAndUpdate(
      { _id: ObjectId(userId) },
      { $push: { products: newProduct } },
      { upsert: true }
    ).exec();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(405).json({ message: err.message });
  }
};
