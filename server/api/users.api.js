var express = require('express');
var router = express.Router();

const userController = require('../controllers/users.controller')

router.post("/", userController.create);
router.get("/:id", userController.read);
router.put("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;
