import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-access-token"];
  if (token == null) {
    return res.json({
      success: false,
      message: "No token provided",
    });
  }
  verify(
    token as string,
    process.env.JWT_SECRET as string,
    (err, user: any) => {
      if (err) {
        return res.json({
          success: false,
          message: "Invalid token",
        });
      }
      req.user = { name: user.name, email: user.email };
      next();
    }
  );
};

export default authenticateToken;
