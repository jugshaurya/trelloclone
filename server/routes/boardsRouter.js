const router = require("express").Router();
const {
  getAllBoards,
  createNewBoard,
  getBoard
} = require("../services/boards.services");

router.get("/", getAllBoards);
router.get("/:id", getBoard);
router.post("/", createNewBoard);

module.exports = router;
