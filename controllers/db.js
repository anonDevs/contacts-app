const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/contacts-app",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      console.log(err);
      console.log("connection to DB Failed!");
    } else {
      console.log("connection to DB Successful!");
    }
  }
);
