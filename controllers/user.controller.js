const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Department = require("../models/department.model");

exports.renderUsers = async (req, res) => {
  try {
    const departments = await Department.find();
    const users = await User.find();
    res.render("users", {
      admin: true,
      users,
      departments
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
    const departments = await Department.find();
    const user = await User.findById(req.params.id);
    res.render("reset-pass", {
      admin: true,
      user,
      departments
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

exports.renderAddUser = async (req, res) => {
  try {
    const departments = await Department.find();

    res.render("add-user", {
      admin: true,
      departments
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

exports.renderEditUser = async (req, res) => {
  try {
    const departments = await Department.find();
    const user = await User.findById(req.params.id);
    if (!user) {
      res.flash("danger", "That user is not found..");
      res.redirect("/users");
      return null;
    }
    res.render("edit-user", {
      admin: true,
      user,
      departments
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

exports.editUser = async (req, res) => {
  let isAdmin;

  if (req.body.admin == undefined) {
    isAdmin = false;
  } else {
    isAdmin = true;
  }

  try {
    const update = {};

    req.body.username ? (update.username = req.body.username) : null;
    isAdmin ? (update.admin = isAdmin) : (update.admin = false);

    await User.findByIdAndUpdate(req.params.id, update);

    res.flash("success", "The user was updated successfully!");
    res.redirect("/users");
  } catch (e) {
    console.log(e);
    res.flash(
      "danger",
      "There was a problem with the system. Please contact the developer."
    );
    res.redirect("/");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const amountOfUsers = await User.countDocuments();
    const admins = await User.find({
      admin: true
    });
    if (amountOfUsers == 1) {
      res.flash(
        "danger",
        "This is the only user on the system. You  cannot delete this user."
      );
      res.redirect("/users");
    } else if (user.admin && admins.length == 1) {
      res.flash(
        "danger",
        "This is the only Admin user on the system. You  cannot delete this user."
      );
      res.redirect("/users");
    } else if (req.session.userId == user._id) {
      await User.findByIdAndDelete(req.params.id);
      res.redirect("/logout");
    } else {
      await User.findByIdAndDelete(req.params.id);
      res.flash("success", "The user was deleted successfully!");
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
