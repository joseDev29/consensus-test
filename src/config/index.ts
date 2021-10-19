import dotenv from "dotenv";

dotenv.config();

export const db_config = {
  host: <string>process.env.DB_HOST,
  user: <string>process.env.DB_USER,
  password: <string>process.env.DB_PASSWORD,
  name: <string>process.env.DB_NAME,
};

export const server_config = {
  port: process.env.SERVER_PORT,
};
