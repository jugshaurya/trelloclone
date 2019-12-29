const router = require("express").Router();
const userRouter = require("./userRouter");
const boardsRouter = require("./boardsRouter");

const { isUserAuthenticated } = require("../passport/passport");
router.use("/user", userRouter);

// protected Resources
router.use("/boards", isUserAuthenticated, boardsRouter);

// router.use("/", (req, res, next) => {
//   res.json(`Hello Hello from server`);
// });

module.exports = router;
