const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compress = require("compression");
const morgan = require("morgan");
const app = express();

const mongoose = require("mongoose");
const passport = require("passport");

const mainRouter = require("./routes/mainRouter");

// basic Configuration Middlewares
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("combined"));
}

// db connection
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb://localhost/trello-clone", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// routers
app.use("/", mainRouter);

// error middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Server Error!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
