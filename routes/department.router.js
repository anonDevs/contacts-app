const express = require("express");
const router = express.Router();

const departmentController = require("../controllers/department.controller");
const {
  checkIfAdmin,
  checkLoggedIn,
  checkNotLoggedIn
} = require("../middleware/middleware");

router
  .route("/")
  .get(checkNotLoggedIn, checkIfAdmin, departmentController.renderDepartments);

router
  .route("/add")
  .get(checkNotLoggedIn, checkIfAdmin, departmentController.renderAddDepartment)
  .post(checkNotLoggedIn, checkIfAdmin, departmentController.addDepartment);

router
  .route("/edit/:id")
  .get(
    checkNotLoggedIn,
    checkIfAdmin,
    departmentController.renderEditDepartment
  )
  .post(checkNotLoggedIn, checkIfAdmin, departmentController.editDepartment);

router
  .route("/delete/:id")
  .get(checkNotLoggedIn, checkIfAdmin, departmentController.deleteDepartment);

module.exports = router;
