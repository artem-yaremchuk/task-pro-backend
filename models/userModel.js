// import { model, Schema } from "mongoose";
// import { compare, genSalt, hash } from "bcrypt";
// import {
//   themeTypes
// } from "../constants.js";

// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Username is required"],
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: [true, "Set password for user"],
//     },
//     theme: {
//       type: String,
//       enum: themeTypes,
//       default: "dark",
//     },
//     token: String,
//     avatarURL: String,
//   },
//   { versionKey: false, timestamps: true },
// );

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   const salt = await genSalt(10);
//   this.password = await hash(this.password, salt);

//   next();
// });

// userSchema.methods.checkPassword = (candidate, passwordHash) =>
//   compare(candidate, passwordHash);

// export const User = model("User", userSchema);
