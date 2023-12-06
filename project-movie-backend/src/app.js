const express = require("express");
const cors = require("cors");

const app = express();
const moviesRouter = require("./routes/movies.router");
const userRouter = require("./routes/user.router");
const searchRouter = require("./routes/search.router");
const authRouter = require("./routes/auth.router");

const {
  resourceNotFound,
  handleError,
} = require("./controllers/errors.controller");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to movie review web application." });
});

app.use("/api/movies", moviesRouter);
app.use("/api/user", userRouter);
app.use("/api/search", searchRouter);
app.use("/api/auth", authRouter);

//Handle 404 response
app.use(resourceNotFound);

//Define error-handling middleware last
app.use(handleError);

module.exports = app;
