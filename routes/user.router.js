const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {
  checkIfAdmin,
    checkIfSuperAdmin,
  checkLoggedIn,
  checkNotLoggedIn
} = require("../middleware/middleware");

router
  .route("/")
  .get(checkNotLoggedIn, checkIfAdmin, checkIfSuperAdmin, userController.renderUsers);

router
  .route("/add")
  .get(checkNotLoggedIn, checkIfAdmin, checkIfSuperAdmin, userController.renderAddUser)
  .post(checkNotLoggedIn, checkIfAdmin, checkIfSuperAdmin, userController.addUser);

router
  .route("/edit/:id")
  .get(checkNotLoggedIn, checkIfAdmin, checkIfSuperAdmin, userController.renderEditUser)
  .post(checkNotLoggedIn, checkIfAdmin, checkIfSuperAdmin, userController.editUser);

router
  .route("/delete/:id")
  .get(checkNotLoggedIn, checkIfAdmin, checkIfSuperAdmin, userController.deleteUser);

router
  .route("/resetpass/:id")
  .get(checkNotLoggedIn, checkIfAdmin, checkIfSuperAdmin, userController.renderResetPass)
  .post(checkNotLoggedIn, checkIfAdmin, checkIfSuperAdmin, userController.resetUserPassword);

module.exports = router;
