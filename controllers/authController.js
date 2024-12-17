const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const adminUsername = process.env.ADMIN_USERNAME;
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
const jwtSecret = process.env.JWT_SECRET;

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (username !== adminUsername) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, adminPasswordHash);

    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username: adminUsername }, jwtSecret, {
      expiresIn: "1h",
    });
    console.log(token);

    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = { login };
