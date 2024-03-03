import catchAsync from "../helpers/catchAsync.js";
import { signup, login } from "../services/usersServices.js";
import { User } from "../models/userModel.js";
import sendEmail from "../helpers/sendEmail.js";

export const registerUser = catchAsync(async (req, res) => {
  const { email } = await signup(req.body);

  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
});

export const loginUser = catchAsync(async (req, res) => {
  const { email, token } = await login(req.body);

  res.status(200).json({
    token,
    user: {
      email,
      subscription: "starter",
    },
  });
});

export const getCurrentUser = (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

export const logoutUser = catchAsync(async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
});

export const emailSupport = async (req, res) => {
  const { email, comment } = req.body;

  const helpRequest = {
    to: "taskpro.project@gmail.com",
    subject: "User need help.",
    html: `<p> Email: ${email}, Comment: ${comment}</p>`,
  };
  await sendEmail(helpRequest);
  const helpResponse = {
    to: email,
    subject: "Support",
    html: `<p>Thank's for your request! We will review your comment as soon as possible!</p>`,
  };
  await sendEmail(helpResponse);

  res.json({
    message: "Reply email has been sent",
  });
};
