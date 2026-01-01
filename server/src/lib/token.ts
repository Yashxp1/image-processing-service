import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userId: string, res: Response) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "lax",   
    secure: false,     
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
    
  } catch (error) {
    console.log(error);
  }
};
