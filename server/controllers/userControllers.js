const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc     Register user
// @route:   POST /api/users/
const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return next({
        message: { err: "Missing required input fields" },
      });
    }

    // Check if user exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      return next({
        message: { err: "User already exists" },
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return next({
        message: { err: "Invalid user data" },
      });
    }

    // Generate token after register
    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Only serve these fields back to the frontend (i.e. without password)
    res.locals.user = {
      _id: user._id,
      firstName: user.firstName,
      token: token,
    };

    return next();
  } catch (error) {
    return res.status(404).json({ message: { err: error.message } });
  }
};

// @desc     Login user
// @route:   POST /api/users/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next({
        message: { err: "Missing required input fields" },
      });
    }

    // Check for user email
    const user = await User.findOne({ email });

    if (!user) {
      return next({
        message: { err: "User does not exist" },
      });
    }

    // Compare user's password with req.body.password
    if (await bcrypt.compare(password, user.password)) {
      // Generate token after login
      const token = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.locals.user = {
        _id: user._id,
        firstName: user.firstName,
        token: token,
      };

      return next();
    } else {
      return next({
        message: { err: "Invalid email or password" },
      });
    }
  } catch (error) {
    return res.status(404).json({ message: { err: error.message } });
  }
};

// @desc     Login user
// @route:   POST /api/users/me
const getMe = async (req, res, next) => {
  const { _id, firstName, lastName, email } = req.user;
  res.locals.user = { _id, firstName, lastName, email };
  return next();
};

module.exports = { register, login, getMe };
