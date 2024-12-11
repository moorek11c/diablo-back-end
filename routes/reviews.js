const router = require("express").Router();

const { getAllReviews } = require("../controllers/reviews");

router.get("/", getAllReviews);

module.exports = router;
