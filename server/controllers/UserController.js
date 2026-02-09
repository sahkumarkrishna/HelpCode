import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Signup controller
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // 1. Validate input
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create new user
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    // 6. Send success response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout
export const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// Update Password (with confirm password)
export const updateProfile = async (req, res) => {
  try {
    const { password: newPassword, confirmPassword, currentPassword } = req.body;
    const userId = req.user._id; // user ID from authentication middleware

    if (!currentPassword)
      return res.status(400).json({ message: "Current password is required", success: false });

    if (!newPassword || !confirmPassword)
      return res.status(400).json({ message: "New password and confirm password are required", success: false });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match", success: false });

    const user = await User.findById(userId).select("+password");
    if (!user)
      return res.status(404).json({ message: "User not found", success: false });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect current password", success: false });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Update password error:", error);
    return res.status(500).json({ message: "Server error during password update", success: false });
  }
};