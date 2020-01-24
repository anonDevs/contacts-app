const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {
  checkIfAdmin,
  checkLoggedIn,
  checkNotLoggedIn
} = require("../middleware/middleware");

router
  .route("/")
  .get(checkNotLoggedIn, checkIfAdmin, userController.renderUsers);

router
  .route("/add")
  .get(checkNotLoggedIn, checkIfAdmin, userController.renderAddUser)
  .post(checkNotLoggedIn, checkIfAdmin, userController.addUser);

router
  .route("/edit/:id")
  .get(checkNotLoggedIn, checkIfAdmin, userController.renderEditUser)
  .post(checkNotLoggedIn, checkIfAdmin, userController.editUser);

router
  .route("/delete/:id")
  .get(checkNotLoggedIn, checkIfAdmin, userController.deleteUser);

router
  .route("/resetpass/:id")
  .get(checkNotLoggedIn, checkIfAdmin, userController.renderResetPass)
  .post(checkNotLoggedIn, checkIfAdmin, userController.resetUserPassword);

module.exports = router;
