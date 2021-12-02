var express = require("express");
var router = express.Router();

const authMiddleware = require("../middlewares/authentication");
const postsController = require("../controllers/posts.controller");
const reactionsController = require("../controllers/reaction.controller");

router.post("/", authMiddleware.loginRequired, reactionsController.create) 

module.exports = router;
