const router = require("express").Router();
const userController = require("../controllers/users");
const auth = require("../middleware/auth");

router.post("/signup", userController.signup);

router.post("/signin", userController.signin);

router.get("/users/me", auth, userController.getCurrentUser);

module.exports = router;
