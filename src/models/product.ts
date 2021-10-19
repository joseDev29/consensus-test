import { DataTypes } from "sequelize";
import db from "../db/connection";

export const Product = db.define("products", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
});
