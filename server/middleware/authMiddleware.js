const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from headers
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findOne({ _id: decoded._id }, { password: 0 });

      return next();
    } catch (error) {
      return res.status(404).json({ message: { err: "Not Authorized" } });
    }
  }

  if (!token) {
    return next({
      message: { err: "Not Authorized, no token" },
    });
  }
};

module.exports = { protect };
