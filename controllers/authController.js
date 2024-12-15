const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const adminUsername = process.env.ADMIN_USERNAME;
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
const jwtSecret = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Received login request:", { username, password });
    console.log("Expected admin username:", adminUsername);
    console.log("Expected admin password hash:", adminPasswordHash);

    if (username !== adminUsername) {
      console.log("Invalid username");
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, adminPasswordHash);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Invalid password");
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username: adminUsername }, jwtSecret, {
      expiresIn: "1h",
    });

    console.log("Generated token:", token);
    res.send({ token });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send({ message: "Server error" });
  }
};
