const mongoose = require("mongoose");
const Card = require("../models/cardModel");
const User = require("../models/userModel");

// @desc     Load cards when user signs in
// @route:   GET /api/cards
const loadCards = async (req, res, next) => {
  try {
    const cards = await Card.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.locals.cards = cards;
    return next();
  } catch (error) {
    return res.status(404).json({ message: { err: error.message } });
  }
};

// @desc     Create new card
// @route:   POST /api/cards
const createCard = async (req, res, next) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return next({
        message: {
          err: "Missing required input fields",
        },
      });
    }

    const newCard = await Card.create({ user: req.user._id, question, answer });
    res.locals.newCard = newCard;
    return next();
  } catch (error) {
    return res.status(404).json({ message: { err: error.message } });
  }
};

// @desc     Update card
// @route:   PATCH /api/cards/:id
const updateCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { question, answer, status, favorite } = req.body;

    // check if /:id is a valid ObjectId in database
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next({
        message: {
          err: "Invalid ID. No such card exists",
        },
      });
    }

    const card = await Card.findById(id);

    if (!card) {
      return next({
        message: {
          err: "No such card exists",
        },
      });
    }

    if (!question || !answer) {
      return next({
        message: {
          err: "Missing required input fields",
        },
      });
    }

    const updateData = {
      question: question,
      answer: answer,
      status: status,
      favorite: favorite,
    };

    const user = await User.findById(req.user._id);

    if (!user) {
      return next({
        message: { err: "User not found" },
      });
    }

    // User can only update his/her own flashcards
    if (card.user.toString() !== user._id.toString()) {
      return next({
        message: {
          err: "Unauthorized",
        },
      });
    }

    const updatedCard = await Card.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
    });

    res.locals.updatedCard = updatedCard;
    return next();
  } catch (error) {
    return res.status(404).json({ message: { err: error.message } });
  }
};

// @desc     Delete card
// @route:   DELETE /api/cards/:id
const deleteCard = async (req, res, next) => {
  try {
    const { id } = req.params;

    // check if /:id is a valid ObjectId in database
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next({
        message: {
          err: "Invalid ID. No such card exists",
        },
      });
    }

    const card = await Card.findById(id);

    if (!card) {
      return next({
        message: {
          err: "No such card exists",
        },
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return next({
        message: { err: "User not found" },
      });
    }

    // User can only delete his/her own flashcards
    if (card.user.toString() !== user._id.toString()) {
      return next({
        message: { err: "Unauthorized" },
      });
    }

    const deletedCard = await Card.findOneAndDelete({ _id: id });

    res.locals.deletedCard = deletedCard;
    return next();
  } catch (error) {
    return res.status(404).json({ message: { err: error.message } });
  }
};

module.exports = { loadCards, createCard, updateCard, deleteCard };
