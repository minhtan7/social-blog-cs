var express = require("express");
var router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/login", authController.loginWithEmail);

router.post("/login/google", authController.loginWithGoogle)

router.post("/login/facebook", authController.loginWithFacebook)


module.exports = router;
