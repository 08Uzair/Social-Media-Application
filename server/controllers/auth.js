import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { user } from "../models/user.js";
const secret = "social";

// SIGN IN

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await user.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "7d",
    });
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// SIGN UP

export const signUp = async (req, res) => {
  const {
    firstName,
    surname,
    email,
    password,
    day,
    month,
    year,
    coverImage,
    profileImage,
    gender,
    bio,
    createdAt,
  } = req.body;

  try {
    const oldUser = await user.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await user.create({
      firstName,
      surname,
      email,
      password: hashedPassword,
      coverImage,
      profileImage,
      day,
      month,
      year,
      gender,
      bio,
      createdAt,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "7d",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    error;
  }
};

// GET ALL USERS

export const getUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed" });
  }
};

//  GET USER BY ID

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await user.findById(id);

    res.status(200).json(users);
  } catch (error) {
    error;
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update User
export const updateUser = async (req, res) => {
  const { id } = req.params;
  //   const user = req.userId;
  const {
    firstName,
    surname,
    email,
    password,
    day,
    month,
    year,
    coverImage,
    profileImage,
    gender,
    bio,
    followers,
    following,
  } = req.body;
  try {
    const updatedata = {
      firstName,
      surname,
      email,
      password,
      day,
      month,
      year,
      coverImage,
      profileImage,
      gender,
      bio,
      followers,
      following,
    };
    const updatedUser = await user.findByIdAndUpdate(id, updatedata, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res
      .status(200)
      .json({ result: updatedUser, message: "Updated Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error}` });
  }
};
