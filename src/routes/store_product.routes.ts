import { Router } from "express";

import { createStock } from "../controllers/store_product.controller";

const router = Router();

router.post("/create-stock", createStock);

export default router;
