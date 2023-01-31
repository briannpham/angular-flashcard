const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { register, login, getMe } = require("../controllers/userControllers");

const router = express.Router();

router.post("/", register, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.post("/login", login, (req, res) => {
  return res.status(200).json(res.locals.user);
});

router.post("/me", protect, getMe, (req, res) => {
  return res.status(200).json(res.locals.user);
});

module.exports = router;
