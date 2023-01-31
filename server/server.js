const dotenv = require("dotenv").config();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// routers
const cardsRouter = require("./routes/cardsRoute");
const userRouter = require("./routes/userRoute");

// Logging requests to terminal
const logger = (req, res, next) => {
  console.log(
    `${req.method}`,
    `${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
};
app.use(logger);

// Connect to database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to Mongo DB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.use(express.static(path.join(__dirname, "../src")));
app.use("/api/cards", cardsRouter);
app.use("/api/user", userRouter);

app.use((req, res) => {
  res.status(404).send("404 Errors");
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middlzeware error",
    status: 400,
    message: { err: "An error occurred. In global error handler" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
