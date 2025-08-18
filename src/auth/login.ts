import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import * as dotenv from "dotenv";
import { promisify } from "util";

const SECRET_KEY = process.env.JWT_SECRET_KEY;
bcrypt.setRandomFallback((len: number): number[] => {
  return Array.from(crypto.randomBytes(len));
});
export const generateToken = <T extends JwtPayload>(
  payload: T,
  expiresIn: string
): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: expiresIn as any }); //{expiresIn:'1d'}
};

// export const verifyToken = (token:string)=>{
//     return jwt.verify(token,SECRET_KEY);

// }
export async function verifyToken<T extends JwtPayload>(
  token: string
): Promise<T> {
  return await promisify<string, string, any>(jwt.verify)(token, SECRET_KEY);
}


export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};