import catchAsync from "../../shared/catchAsync";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../modules/users/users.model";
import { TUSER } from "../modules/users/users.constants";
import { NextFunction, Request, Response } from "express";
import admin from "./firebase";

const auth = (...requiredRole: TUSER[]) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("You are not logged in");
    }

    const token = authHeader.split(" ")[1];
    let email: string | null = null;
    let role: TUSER | undefined;

    try {
      // ✅ Try verifying with backend JWT
      const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
      email = decoded.email ?? null;
      role = decoded.role as TUSER;
    } catch {
      // ✅ Fallback: try verifying with Firebase
      try {
        const decodedFirebase = await admin.auth().verifyIdToken(token);
        email = decodedFirebase.email ?? null;
      } catch {
        throw new Error("Invalid token");
      }
    }

    if (!email) {
      throw new Error("Invalid token payload");
    }

    // ✅ Ensure user exists in DB
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // ✅ Role check
    if (requiredRole.length && !requiredRole.includes(user.role as TUSER)) {
      throw new Error("Unauthorized");
    }

    // ✅ Attach user info to request
    (req as any).user = { email, role: user.role };
    next();
  });

export default auth;
