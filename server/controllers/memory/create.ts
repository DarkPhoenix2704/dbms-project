import { Request, Response } from "express";
import MemorySchema from "../../model/Memory";
import UserSchema from "../../model/User";

const create = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const { email } = req.user;
  try {
    const creator = await UserSchema.findOne({ email });
    const memory = await await MemorySchema.create({
      title,
      content,
      creator: creator?._id,
    });
    return res.status(201).json({
      success: true,
      message: "Memory created",
      data: memory,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default create;
