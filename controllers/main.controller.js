const User = require("../models/user.model");

exports.renderLogin = (req, res) => {
  res.render("login");
};

exports.renderContacts = async (req, res) => {
  try {
    let admin;

    const user = await User.findById(req.session.userId);

    admin = user.admin;

    res.render("home", {
      admin
    });
  } catch (e) {
    console.log(e);
  }
};
