const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.logInUser = async (req, res) => {
  const {username, password} = req.body;
  try {
    const user = await User.findOne({
      username
    });
    if (!user) {
      res.flash("danger", "Incorrect Username/Password");
      res.redirect("/login");
      return null;
    }

    const credentialsVerified = await bcrypt.compare(password, user.password);

    if (!credentialsVerified) {
      res.flash("danger", "Incorrect Username/Password");
      res.redirect("/login");
      return null;
    }

    req.session.userId = user._id;

    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.flash(
      "danger",
      "There was a problem with the system. Please contact the developer!"
    );
    res.redirect("/login");
  }
};

exports.logOutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return null;
    }
    res.redirect("/login");
  });
};
