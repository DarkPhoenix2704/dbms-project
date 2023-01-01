import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import UserSchema from "../../model/User";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN as string,
      }
    );
    return res.status(200).json({
      success: true,
      message: "User logged in",
      data: {
        token,
      },
    });
  } catch {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export default login;
