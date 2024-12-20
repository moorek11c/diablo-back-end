const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();

router.post("/sign-in", async (req, res, next) => {
  try {
    await adminController.login(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
