const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main.controller");
const authController = require("../controllers/auth.controller");
const {checkLoggedIn, checkNotLoggedIn} = require("../middleware/middleware");

router.route("/").get(checkNotLoggedIn, (req, res) => {
  res.redirect('/contacts')
});

router
  .route("/login")
  .get(checkLoggedIn, mainController.renderLogin)
  .post(authController.logInUser);

router.route("/logout").get(checkNotLoggedIn, authController.logOutUser);

module.exports = router;
