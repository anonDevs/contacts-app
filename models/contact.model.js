const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "Department"
  },
  designation: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  extension: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User'
  },
  lastModifiedBy: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User'
  }
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
