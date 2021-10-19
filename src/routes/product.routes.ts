import { Router } from "express";

import { createProduct } from "../controllers/product/createProducts";
import { getProductById } from "../controllers/product/getProductById";
import { getProducts } from "../controllers/product/getProducts";
import { updateProduct } from "../controllers/product/updateProduct";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", createProduct);

router.put("/:id", updateProduct);

export default router;
