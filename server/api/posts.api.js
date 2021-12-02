var express = require("express");
var router = express.Router();

const authMiddleware = require("../middlewares/authentication");
const postsController = require("../controllers/posts.controller");

router.post("/", authMiddleware.loginRequired, postsController.create);
router.get("/", authMiddleware.loginRequired, postsController.list);
router.get("/:id", postsController.read);
router.put("/:id", postsController.update);
router.delete("/:id", postsController.destroy);
router.post(
  "/:id/comments",
  authMiddleware.loginRequired,
  postsController.createComment
);

module.exports = router;
