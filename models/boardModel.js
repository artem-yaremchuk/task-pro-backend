import { model, Schema } from "mongoose";

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for board"],
    },
    icon: {
      type: String,
      enum: iconTypes,
      default: "icon-project",
    },
    background: {
      type: String,
      enum: backgroundTypes,
      default: "00",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true },
);

export const Board = model("board", boardSchema);
