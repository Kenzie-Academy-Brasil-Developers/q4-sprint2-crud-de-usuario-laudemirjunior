import dotenv from "dotenv";

dotenv.config();

export const config: { secretKey: any; expiresIn: string } = {
  secretKey: process.env.SECRETKEY,
  expiresIn: process.env.EXPIRESIN,
};
