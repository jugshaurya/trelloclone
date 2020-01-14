const router = require("express").Router();
const {
  getAllBoards,
  createNewBoard,
  getBoard,
  deleteBoard
} = require("../services/boards.services");

router.get("/", getAllBoards);
router.get("/:id", getBoard);
router.post("/", createNewBoard);
router.delete("/", deleteBoard);

module.exports = router;
