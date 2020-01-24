const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");
const {
  checkIfAdmin,
  checkLoggedIn,
  checkNotLoggedIn
} = require("../middleware/middleware");

router.route("/").get(checkNotLoggedIn, contactController.renderContacts);

router
  .route("/add")
  .get(checkNotLoggedIn, checkIfAdmin, contactController.renderAddContact)
  .post(checkNotLoggedIn, checkIfAdmin, contactController.addContact);

router
  .route("/edit/:id")
  .get(checkNotLoggedIn, checkIfAdmin, contactController.renderEditContact)
  .post(checkNotLoggedIn, checkIfAdmin, contactController.editContact);

router
  .route("/search")
  .get(checkNotLoggedIn, contactController.renderSearchedContacts);

router
  .route("/:departmentId")
  .get(checkNotLoggedIn, contactController.renderContactsByDepartment);

module.exports = router;
