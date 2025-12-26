import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

interface JwtPayload {
  userId: string;
}

export const ProtectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    (req as any).user = user;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
};
