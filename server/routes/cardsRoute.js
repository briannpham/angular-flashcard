const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  loadCards,
  createCard,
  updateCard,
  deleteCard,
} = require("../controllers/cardsControllers");

const router = express.Router();

router.get("/", protect, loadCards, (req, res) => {
  return res.status(200).json(res.locals.cards);
});

router.post("/create", protect, createCard, (req, res) => {
  return res.status(200).json(res.locals.newCard);
});

router.patch("/:id", protect, updateCard, (req, res) => {
  return res.status(200).json(res.locals.updatedCard);
});

router.delete("/:id", protect, deleteCard, (req, res) => {
  return res.status(200).json(res.locals.deletedCard);
});

module.exports = router;
