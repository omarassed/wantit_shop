import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//Authenticate User & get token
//Route POST /api/users/login
//Access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//Register user
//POST /api/users
//Public

const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

//Log out the user & clear the cookie
//POST /api/users/logout
//Private

const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

//Get user profile
//GET /api/users/profile
//Private

const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

//Udate user profile
//PUT /api/users/profile
//Private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

//Get users
//GET /api/users
//Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

//Get user by ID
//GET /api/users/:id
//Private/Admin

const getUserByID = asyncHandler(async (req, res) => {
  res.send("get user by ID");
});

//Delete users
//DELETE /api/users/:id
//Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

//Update user
//PUT /api/users/:id
//Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  res.send("update users");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
};
