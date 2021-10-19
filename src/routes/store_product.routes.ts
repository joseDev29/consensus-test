import { Router } from "express";

import { createStock } from "../controllers/store_product/createStock";
import { getAllProductsByStoreId } from "../controllers/store_product/getAllProductsByStoreId";
import { getStockProductByStoreId } from "../controllers/store_product/getStockProductByStoreId";
import { transferStock } from "../controllers/store_product/transferStock";

const router = Router();

router.post("/create-stock", createStock);

router.get("/:store_id/stock/:product_id", getStockProductByStoreId);

router.get("/all-products/:store_id", getAllProductsByStoreId);

router.post("/transfer-stock", transferStock);

export default router;
