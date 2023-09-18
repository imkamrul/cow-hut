import express from "express";
import { auth } from "../../middleware/Auth";

import { tokenMatch } from "../../middleware/TokenMatch";
import validateRequest from "../../middleware/validateRequest";
import { role } from "../auth/auth.constant";
import {
  bulkDeleteProduct,
  createProduct,
  deleteProductById,
  generateDummyData,
  getProductById,
  updateProductById,
} from "./product.controller";
import { ProductZodSchema } from "./product.validation";

const router = express.Router();
router.post(
  "/create-product",
  validateRequest(ProductZodSchema),
  auth(role[1], role[2]),
  tokenMatch(),
  createProduct
);
router.get("/single-product/:id", auth(role[1], role[2]), getProductById);
router.get("/bulk-product-create", auth(role[1]), generateDummyData);
router.post("/bulk-product-delete", auth(role[1]), bulkDeleteProduct);

router.delete("/single-product/:id", auth(role[1], role[2]), deleteProductById);
router.patch("/single-product/:id", auth(role[1], role[2]), updateProductById);
export const ProductRoutes = router;
