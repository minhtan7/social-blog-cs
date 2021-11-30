var express = require('express');
var router = express.Router();

const userController = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/authentication');

router.post("/", userController.create);
router.get("/me", authMiddleware.loginRequired, userController.readCurrentUser)
router.get("/:id", userController.read);
router.put("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;
