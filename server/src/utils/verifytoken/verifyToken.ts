import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

import readAppConfig from "../appConfigRead/appConfigRead.ts";
import { error } from "node:console";

interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

export const verifyToken = (token: string) => {
  try {
    const { jwtkey } = readAppConfig();

    if (!jwtkey.JWT_SECRET) {
      return { status: false, message: "Error to read Jwt Secret" };
    }

    if (!token) {
      return { status: false, message: "Token is Required in Header" };
    }

    try {
      const decoded = jwt.verify(token, jwtkey.JWT_SECRET);
      return { status: true, message: "token is correct", decoded };
    } catch (error) {
      return { status: false, message: "Token is tampered or expired" };
    }
  } catch (err: any) {
    return {
      status: false,
      message: "Internal server error in middleware while verifying token",
    };
  }
};
