import asyncHandler from "express-async-handler";
import User from "../models/userModal.js";
import { generateToken } from "../config/generateJWT.js";
import bcrypt from "bcryptjs";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(200);
    throw new Error("please enter all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    pic,
  });
  console.log(user.id);

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  console.log(user);

  const Matched = await bcrypt.compare(password, user.password);
  if (!Matched) {
    res.status(400);
    throw new Error("password mismatch");
  }

  if (user && Matched) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// /api/user?search=hepzi
export const searchUser = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
