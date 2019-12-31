const router = require("express").Router();
const userRouter = require("./usersRouter");
const boardsRouter = require("./boardsRouter");
const listsRouter = require("./listsRouter");
const { isUserAuthenticated } = require("../passport/passport");

router.use("/user", userRouter);

// protected Resources
router.use("/boards", isUserAuthenticated, boardsRouter);
router.use("/lists", isUserAuthenticated, listsRouter);

// router.use("/", (req, res, next) => {
//   res.json(`Hello Hello from server`);
// });

module.exports = router;
