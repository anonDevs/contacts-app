const User = require("../models/user.model");

exports.renderLogin = (req, res) => {
  res.render("login");
};
