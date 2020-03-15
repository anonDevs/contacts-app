const User = require("../models/user.model");

exports.checkLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect("/");
  }
  next();
};

exports.checkNotLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  next();
};

exports.checkIfAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);

    if (user.admin) {
      next();
    } else {
      res.flash("danger", "Access is denied!");
      res.redirect("/contacts");
    }
  } catch (e) {
    console.log(e);
    res.flash(
      "danger",
      "There was an error with the system! Please contact the developer."
    );
    res.redirect("/");
  }
};

exports.checkIfSuperAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);

    if (user.superAdmin) {
      next();
    } else {
      res.flash("danger", "Access is denied!");
      res.redirect("/contacts");
    }
  } catch (e) {
    console.log(e);
    res.flash(
      "danger",
      "There was an error with the system! Please contact the developer."
    );
    res.redirect("/");
  }
};
