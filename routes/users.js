var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController")
const middleware = require("../middleware/middleware")

router.get("/", userController.all)
router.post("/login", middleware.checkPassword, userController.login)
router.post("/signup", userController.signup)
router.put("/follow", userController.follow)

module.exports = router;
