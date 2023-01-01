import { Request, Response } from "express";
import MemorySchema from "../../model/Memory";
import UserSchema from "../../model/User";

const getAll = async (req: Request, res: Response) => {
  const { email } = req.user;
  try {
    const reqUser = await UserSchema.findOne({ email });
    const memories = await MemorySchema.find({
      creator: reqUser?._id,
    });
    return res.json({
      success: true,
      message: "Memories found",
      data: {
        memories: memories,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default getAll;
