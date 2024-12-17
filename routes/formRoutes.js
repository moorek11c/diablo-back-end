const express = require("express");

const formController = require("../controllers/quoteform");

const router = express.Router();

// Route to handle form submission
router.post("/submit-form", formController.sendQuoteEmail);

module.exports = router;
