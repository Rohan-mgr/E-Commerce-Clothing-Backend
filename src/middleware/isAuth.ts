require("dotenv").config();
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface DecodedToken extends Request {
  userId: string;
  token: string | JwtPayload;
}

const SECRET_KEY: Secret = process.env.JWT_TOKEN_SECRET!;

module.exports = (req: Request, res: Response, next: NextFunction) => {
  let decodedToken;
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      throw new Error("Not Authenticated!") as Error & { statusCode: 401 };
    }
    const token = authHeader.split(" ")[1];
    decodedToken = jwt.verify(token, SECRET_KEY as string) as DecodedToken;
  } catch (error) {
    throw new Error("Not Authenticated!") as Error & { statusCode: 500 };
  }
  if (!decodedToken) {
    throw new Error("Not Authenticated!") as Error & { statusCode: 401 };
  }
  (req as DecodedToken).userId = decodedToken?.userId;
  next();
};
