import { hash } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import UserSchema from "../../model/User";

const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserSchema.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await hash(password, 10);
    const newUser = new UserSchema({ name, email, password: hashedPassword });
    await newUser.save();

    const token = sign(
      {
        name: newUser.name,
        email: newUser.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN as string,
      }
    );
    return res.status(200).json({
      success: true,
      message: "User created",
      data: {
        user: {
          name: newUser.name,
          email: newUser.email,
        },
        token,
      },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
export default signup;
