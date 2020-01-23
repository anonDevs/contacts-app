const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const addAdminIfNoUsers = async (username, password) => {
  try {
    const users = await User.find();
    if (users.length == 0 || !users) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          try {
            await User.create({
              username,
              password: hash,
              admin: true
            });
            console.log(verify);
          } catch (e) {
            console.log(e);
          }
        });
      });
    }
  } catch (e) {
    console.log(e);
  }
};

addAdminIfNoUsers("admin", "p@ssw0rd");
