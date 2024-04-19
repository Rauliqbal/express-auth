import User from "../models/User.js";
import bcrypt from "bcrypt";

// Register Handler
export async function Register(req, res) {
  const { full_name, username, email, password } = req.body;

  try {
    const newUser = new User({
      full_name,
      username,
      email,
      password,
    });

    // Check if user already exists
    const checkEmail = await User.findOne({ email });
    if (checkEmail)
      return res.status(400).json({
        status: "Failed",
        message: "Email already exists",
      });

    const savedUser = await newUser.save();
    const { password, role, ...user_data } = savedUser._doc;
    res.status(200).json({
      status: "Success!",
      data: [user_data],
      message: "Your account has been successfully created.",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      code: 500,
      message: "Internal Server Error",
    });
  }

  res.end();
}

// Login Handler
export async function Login(req, res) {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username }).select("+password");
    // Validate username
    if (!user)
      return res.status(401).json({
        status: "failed",
        message: "Invalid Username",
      });

    // Validate password
    const isPasswordValid = await bcrypt.compare(
      `${req.body.password}`,
      user.password
    );
    if (!isPasswordValid)
      return res.status(401).json({
        status: "failed",
        message: "Invalid password",
      });

    const { password, ...user_data } = user._doc;

    res.status(200).json({
      status: "success",
      data: [user_data],
      message: "You successfully logged id",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }

  res.end();
}
