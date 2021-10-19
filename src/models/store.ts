import { DataTypes } from "sequelize";
import db from "../db/connection";

export const Store = db.define("stores", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});
