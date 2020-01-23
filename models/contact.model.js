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
  phone: {
    type: String
  },
  email: {
    type: String
  },
  extension: {
    type: String
  }
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
