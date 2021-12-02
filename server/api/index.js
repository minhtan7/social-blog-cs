var express = require('express');
var router = express.Router();

var usersRouter = require("./users.api");
router.use('/users', usersRouter)

var authRouter = require("./auth.api");
router.use('/auth', authRouter)

var postsRouter = require("./posts.api");
router.use('/posts', postsRouter)

var commentsRouter = require("./comments.api");
router.use('/comments', commentsRouter)


var reactionsRouter = require("./reaction.api");
router.use('/reactions', reactionsRouter)

module.exports = router;
