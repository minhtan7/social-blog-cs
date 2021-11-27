var express = require("express");
var router = express.Router();

const authMiddleware = require("../middlewares/authentication");
const commentsController = require("../controllers/comments.controller");

router.post("/", authMiddleware.loginRequired, commentsController.create);
router.get("/", commentsController.list);
router.get("/:id", commentsController.read);
router.put("/:id", commentsController.update);
router.delete("/:id", commentsController.destroy);

module.exports = router;
