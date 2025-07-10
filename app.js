var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");
// const mongoose = require("mongoose"); // REMOVED
const flash = require("connect-flash"); // for sending messages on redirect
const session = require("express-session");
const methodOverride = require("method-override");

// require("dotenv").config(); // to pull environment variables from .env file

var app = express();
app.use(methodOverride("_method"));

// Load passport configuration
require("./config/passport")(passport);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var AdminRouter = require("./routes/Admin");

// REMOVED: Connect to MongoDB
// let uri = process.env.ORMONGO_URL;
// console.log(`uri: ${uri}`);
// console.log("Connecting to database...");
// mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(function () {
//     console.log("MongoDB connected!");
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Express Session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/Admin", AdminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 3000;
console.log(`Using port ${port}`);
// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

module.exports = app;