import { model, Schema } from "mongoose";
const Memory = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const MemorySchema = model("Memory", Memory);
export default MemorySchema;
