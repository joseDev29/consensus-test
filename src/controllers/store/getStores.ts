import { Request, Response } from "express";

import { Store } from "../../models/store";

export const getStores = async (req: Request, res: Response) => {
  const stores = await Store.findAll();

  return res.status(200).json({
    stores,
  });
};
