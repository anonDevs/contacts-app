const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash-2");

require("./controllers/db");
require("./controllers/initializer");

app.use(express.static("./public/"));
app.use(express.json());
app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(
  session({
    name: "uid",
    secret: "sudfhiwh98u2039ep23jrop234pr02jefoi",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      samesite: true,
      maxAge: 100 * 60 * 60 * 24
    }
  })
);

app.use(flash());

const mainRouter = require("./routes/main.router");
const userRouter = require("./routes/user.router");
const departmentRouter = require("./routes/department.router");
const contactRouter = require("./routes/contact.router");

app.use("/", mainRouter);
app.use("/users", userRouter);
app.use("/departments", departmentRouter);
app.use("/contacts", contactRouter);

module.exports = app;
