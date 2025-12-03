import type{ Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma.js";

export const protectRoute =async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number };

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },

    });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const { password: _, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    // If everything is good → continue
    next();
  } catch (error) {
    return res.status(401).json({ message: "Internal server error" });
  }
};