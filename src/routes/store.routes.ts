import { Router } from "express";

import { createStore } from "../controllers/store/createStore";
import { getStoreById } from "../controllers/store/getStoreById";
import { getStores } from "../controllers/store/getStores";
import { updateStore } from "../controllers/store/updateStore";

const router = Router();

router.get("/", getStores);

router.get("/:id", getStoreById);

router.post("/", createStore);

router.put("/:id", updateStore);

export default router;
