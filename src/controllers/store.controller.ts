import { Request, Response } from "express";

import { Store } from "../models/store";
import { generateID } from "../utils/generateID";

export const getStores = async (req: Request, res: Response) => {
  const stores = await Store.findAll();

  return res.status(200).json({
    stores,
  });
};

export const getStoreById = async (req: Request, res: Response) => {
  const id = req.params["id"];

  const store = await Store.findByPk(id);

  if (!store)
    return res.status(404).json({
      ok: false,
      msg: "Store not found",
    });

  return res.status(200).json({
    ok: true,
    store,
  });
};

export const createStore = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name)
    return res.status(400).json({
      ok: false,
      msg: "Store name is required",
    });

  const id = generateID();

  const store = await Store.create({
    id,
    name,
  });

  return res.status(201).json({
    ok: true,
    msg: "Store created",
    store,
  });
};

export const updateStore = async (req: Request, res: Response) => {
  const id = req.params["id"];

  const { name } = req.body;

  if (!name)
    return res.status(400).json({
      ok: false,
      msg: "Store name is required",
    });

  const store = await Store.findByPk(id);

  if (!store)
    return res.status(404).json({
      ok: false,
      msg: "Store not found",
    });

  await store.update({
    name,
  });

  return res.status(200).json({
    ok: true,
    msg: "Store updated",
    store,
  });
};
