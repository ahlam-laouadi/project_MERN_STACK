import express from "express";
import {
  deleteProduct,
  editProduct,
  getAllProducts,
  getProduct,
  getProductsByName,
  getProductsByCategory,
} from "../controllers/productController.js";
import {
  createComment,
  deleteComment,
} from "../controllers/commentController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:productId", getProduct);

router.post("/products/search", getProductsByName);

router.post("/products/category", getProductsByCategory);

router.delete("/:productId/delete", verifyToken, deleteProduct);

router.post("/:productId/comment", verifyToken, createComment);

router.delete("/:productId/comment/:id/delete", verifyToken, deleteComment);

export default router;
