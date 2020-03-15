const Contact = require("../models/contact.model");
const Department = require("../models/department.model");
const User = require("../models/user.model");

exports.renderContacts = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const departments = await Department.find();
    const contacts = await Contact.find().populate('createdBy').populate('lastModifiedBy');

    const admin = user.admin;
    const superAdmin = user.superAdmin;

    res.render("contacts", {
      admin,
      superAdmin,
      departments,
      contacts
    });
  } catch (e) {
    console.log(e);
  }
};

exports.renderContactsByDepartment = async (req, res) => {
  try {
    const contacts = await Contact.find({
      department: req.params.departmentId
    }).populate('department');
    const departments = await Department.find();
    const user = await User.findById(req.session.userId);
    const admin = user.admin;
    const superAdmin = user.superAdmin;

    res.render("contacts", {
      admin,
      superAdmin,
      departments,
      contacts,
      department: contacts[0].department.name
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

exports.renderSearchedContacts = async (req, res) => {
  try {
    if (!req.query.q) {
      res.flash("warning", "There were no results matching your search.");
      res.redirect("/contacts");
      return null;
    }
    const unfilteredContacts = await Contact.find();
    const departments = await Department.find();
    const user = await User.findById(req.session.userId);
    const admin = user.admin;
    const superAdmin = user.superAdmin;

    const regex = new RegExp(req.query.q, "ig");

    const contacts = unfilteredContacts.filter(contact => {
      if (contact.name.match(regex)) {
        return true;
      }
      if (contact.designation.match(regex)) {
        return true;
      }
      return false;
    });

    if (contacts.length == 0) {
      res.flash("warning", "There were no results matching your search.");
      res.redirect("/contacts");
      return null;
    }

    res.render("searched-contacts", {
      query: req.query.q,
      admin,
      superAdmin,
      departments,
      contacts
    });
  } catch (e) {
    console.log(e);
    res.flash(
      "danger",
      "There was a problem with the system. Please contact the developer."
    );
    res.redirect("/contacts");
  }
};

exports.renderAddContact = async (req, res) => {
  try {
    const departments = await Department.find();
    res.render("add-contact", {
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

exports.renderEditContact = async (req, res) => {
  try {
    const departments = await Department.find();
    const contact = await Contact.findById(req.params.id);
    const user = await User.findById(req.session.userId);
    console.log(user)
    res.render("edit-contact", {
      admin: true,
      superAdmin: user.superAdmin,
      departments,
      contact
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

exports.addContact = async (req, res) => {
  try {
    if (!req.body.department) {
      res.flash("danger", "Department is required for each contact!");
      res.redirect("/contacts/add");
      return null;
    }
    const contact = await Contact.create({
      name: req.body.name,
      createdBy: req.session.userId,
      designation: req.body.designation,
      department: req.body.department,
      phone: req.body.phone,
      email: req.body.email,
      extension: req.body.extension
    });
    if (contact) {
      res.flash("success", "The contact was added successfully!");
      res.redirect("/contacts");
    } else {
      res.flash(
        "danger",
        "The contact was not added! Try again or contact the developer"
      );
      res.redirect("/contacts/add");
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

exports.editContact = async (req, res) => {
  try {
    const update = {};

    req.body.name ? (update.name = req.body.name) : null;
    req.body.department ? (update.department = req.body.department) : null;
    req.body.designation ? (update.designation = req.body.designation) : null;
    req.body.phone ? (update.phone = req.body.phone) : null;
    req.body.email ? (update.email = req.body.email) : null;
    req.body.extension ? (update.extension = req.body.extension) : null;
    update.lastModifiedBy = req.session.userId;

    await Contact.findByIdAndUpdate(req.params.id, update);
    console.log(update);
    res.flash("success", "The user was updated successfully!");
    res.redirect("/contacts");
  } catch (e) {
    console.log(e);
    res.flash(
      "danger",
      "There was a problem with the system. Please contact the developer."
    );
    res.redirect("/");
  }
};

exports.deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.flash("success", "The contact was deleted successfully!");
    res.redirect("/contacts");
  } catch (e) {
    console.log(e);
    res.flash(
      "danger",
      "There was a problem with the system. Please contact the developer."
    );
    res.redirect("/");
  }
};
