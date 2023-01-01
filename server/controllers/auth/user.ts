import { Request, Response } from "express";
import UserSchema from "../../model/User";

const user = async (req: Request, res: Response) => {
  const { email } = req.user;
  try {
    const temp = await UserSchema.findOne({ email });
    return res.json({
      success: true,
      message: "Token is valid",
      data: {
        user: {
          email: temp?.email,
          name: temp?.name,
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export default user;
