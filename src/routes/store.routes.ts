import { Router } from "express";

import {
  createStore,
  getStoreById,
  getStores,
  updateStore,
} from "../controllers/store.controller";

const router = Router();

router.get("/", getStores);

router.get("/:id", getStoreById);

router.post("/", createStore);

router.put("/:id", updateStore);

export default router;
