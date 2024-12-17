require("dotenv").config();

const bcrypt = require("bcryptjs");

const password = process.env.ADMIN_PASSWORD_HASH; // Replace with your actual admin password
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    // Replace with a logging library if needed
    console.error(err);
  } else {
    // Replace with a logging library if needed
    console.log("Hashed password:", hash);
  }
});
