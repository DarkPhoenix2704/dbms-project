import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

const user = async (req: Request, res: Response) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.json({
      success: false,
      message: "No token provided",
    });
  }
  try {
    const decoded = verify(token as string, process.env.JWT_SECRET as string);
    if (!decoded) {
      return res.json({
        success: false,
        message: "Invalid token",
      });
    }
    return res.json({
      success: true,
      message: "Token is valid",
      data: {
        token,
      },
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export default user;
