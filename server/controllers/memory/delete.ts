import { Request, Response } from "express";
import MemorySchema from "../../model/Memory";
import UserSchema from "../../model/User";

const deleteMemory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email } = req.user;
  try {
    const memory = await MemorySchema.findById(id);
    const reqUser = await UserSchema.findOne({ email });
    if (!memory) {
      return res.json({
        success: false,
        message: "Memory not found",
      });
    }
    if (memory.creator.toString() !== reqUser?._id.toString()) {
      return res.json({
        success: false,
        message: "You are not authorized to delete this memory",
      });
    }
    await MemorySchema.findByIdAndDelete(id);
    return res.json({
      success: true,
      message: "Memory deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default deleteMemory;
