import dotenv from "dotenv";
dotenv.config();

export const DB = {
  CONN_STRING: process.env.DB_CONN_STRING as string,
  NAME: process.env.DB_NAME as string,
};
