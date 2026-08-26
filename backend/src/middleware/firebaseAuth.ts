import { Request, Response, NextFunction } from "express";
import { firebaseAuth } from "../services/FirebaseAdmin.js";

export interface AuthenticatedRequest
  extends Request {
  user?: {
    uid: string;
    email?: string;
  };
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization =
      req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Authentication required.",
      });
    }

    const token = authorization.substring(7);

    const decodedToken =
      await firebaseAuth.verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };

    next();
  } catch (error) {
    console.error(
      "Firebase authentication error:",
      error
    );

    return res.status(401).json({
      error: "Invalid authentication token.",
    });
  }
}
