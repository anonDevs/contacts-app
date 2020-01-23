const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.renderUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render("users", {
      admin: true,
      users
    });
  } catch (e) {
    console.log(e);
    res.flash(
      "danger",
      "There was a problem with the system. Please contact the developer."
    );
    res.redirect("/");
  }
};

exports.renderResetPass = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("reset-pass", {
      admin: true,
      user
    });
  } catch (e) {
    console.log(e);
    res.flash(
      "danger",
      "There was a problem with the system. Please contact the developer."
    );
    res.redirect("/");
  }
};

exports.renderAddUser = (req, res) => {
  res.render("add-user", {
    admin: true
  });
};

exports.addUser = async (req, res) => {
  const {username, password, confirmPassword, admin} = req.body;
  let isAdmin;
  if (admin == undefined) {
    isAdmin = false;
  } else if (admin == "on") {
    isAdmin = true;
  }
  try {
    const userExists = await User.findOne({
      username
    });
    if (userExists) {
      res.flash("danger", "The username already exists");
      res.redirect("/users/add");
      return null;
    }
    if (password !== confirmPassword) {
      res.flash("danger", "The passwords do not match");
      res.redirect("/users/add");
      return null;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      password: hash,
      admin: isAdmin
    });
    if (user) {
      res.flash("success", "The user has been created successfully!");
      res.redirect("/users");
    }
  } catch (e) {
    console.log(e);
    res.flash(
      "danger",
      "There was a problem with the system. Please contact the developer."
    );
    res.redirect("/");
  }
};

exports.resetUserPassword = async (req, res) => {
  try {
    const {password, confirmPassword} = req.body;
    if (password !== confirmPassword) {
      res.flash("danger", "The passwords you entered do not match!");
      res.redirect("/users/resetpass/" + req.params.id);
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      await User.findByIdAndUpdate(req.params.id, {
        password: hash
      });
      res.flash("success", "The password was reset successfully!");
      res.redirect("/users");
    }
  } catch (e) {
    console.log(e);
    res.flash(
      "danger",
      "There was a problem with the system. Please contact the developer."
    );
    res.redirect("/");
  }
};
