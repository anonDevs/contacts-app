const Department = require("../models/department.model");
const Contact = require("../models/contact.model");

exports.renderDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    res.render("departments", {
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

exports.renderAddDepartment = async (req, res) => {
  try {
    const departments = await Department.find();
    res.render("add-department", {
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

exports.renderEditDepartment = async (req, res) => {
  try {
    const departments = await Department.find();
    const department = await Department.findById(req.params.id);
    res.render("edit-department", {
      admin: true,
      department,
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

exports.addDepartment = async (req, res) => {
  try {
    const department = await Department.create({
      name: req.body.name
    });

    if (!department) {
      res.flash("danger", "The department was not added!");
      return res.redirect("/departments");
    }

    res.flash("success", "The department was added successfully!");
    res.redirect("/departments");
  } catch (e) {
    console.log(e);
    res.flash(
      "danger",
      "There was a problem with the system. Please contact the developer."
    );
    res.redirect("/");
  }
};

exports.editDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, {
      name: req.body.name
    });
    if (!department) {
      res.flash("danger", "The department was not updated!");
      return res.redirect("/departments");
    }
    res.flash("success", "The department was updated successfully!");
    res.redirect("/departments");
  } catch (e) {
    console.log(e);
    res.flash(
      "danger",
      "There was a problem with the system. Please contact the developer."
    );
    res.redirect("/");
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const contacts = await Contact.find({
      department: req.params.id
    });
    if (contacts.length > 0) {
      res.flash(
        "danger",
        "There are contacts in this departments! You cannot delete it."
      );
      res.redirect("/departments");
      return null;
    }
    await Department.findByIdAndDelete(req.params.id);
    res.flash("success", "The department was successfully deleted!");
    res.redirect("/departments");
  } catch (e) {
    console.log(e);
    res.flash(
      "danger",
      "There was a problem with the system. Please contact the developer."
    );
    res.redirect("/");
  }
};
