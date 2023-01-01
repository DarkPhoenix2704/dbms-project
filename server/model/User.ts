import { Schema, model } from "mongoose";

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  memories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Memory",
    },
  ],
});

const UserSchema = model("User", User);
export default UserSchema;
