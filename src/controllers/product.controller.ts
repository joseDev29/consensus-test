import { Request, Response } from "express";
import { Product } from "../models/product";
import { StoreProduct } from "../models/store_product";
import { generateID } from "../utils/generateID";

export const getProducts = async (req: Request, res: Response) => {
  const products: any[] = await Product.findAll();

  for await (let product of products) {
    product.dataValues.stock = 0;

    const storesProduct: any[] = await StoreProduct.findAll({
      where: {
        product_id: product.id,
      },
    });

    storesProduct.map((stp) => (product.dataValues.stock += stp.stock));
  }

  return res.status(200).json({
    ok: true,
    products,
  });
};

export const getProductById = async (req: Request, res: Response) => {
  const id = req.params["id"];
  const product: any = await Product.findByPk(id);

  if (!product)
    return res.status(404).json({
      ok: false,
      msg: "Product not found",
    });

  product.dataValues.stock = 0;

  const storesProduct = await StoreProduct.findAll({
    where: {
      product_id: product.id,
    },
  });

  storesProduct.map((stp: any) => (product.dataValues.stock += stp.stock));

  return res.status(200).json({
    ok: true,
    product,
  });
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  if (!name)
    return res.status(400).json({
      ok: false,
      msg: "Product name is required",
    });
  if (!description)
    return res.status(400).json({
      ok: false,
      msg: "Product description is required",
    });
  const id = generateID();
  const product = await Product.create({ id, name, description });
  return res.status(201).json({
    ok: true,
    msg: "Product created",
    product,
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params["id"];
  const { name, description } = req.body;
  if (!name)
    return res.status(400).json({
      ok: false,
      msg: "Product name is required",
    });
  if (!description)
    return res.status(400).json({
      ok: false,
      msg: "Product description is required",
    });
  const product = await Product.findByPk(id);
  if (!product)
    return res.status(404).json({
      ok: false,
      msg: "Product not found",
    });
  await product.update({
    name,
    description,
  });
  return res.status(200).json({
    ok: true,
    msg: "Product updated",
    product,
  });
};
