const router = require("express").Router();
const {
  getAllListsInBoard,
  createNewList
} = require("../services/lists.services");

router.get("/:boardId", getAllListsInBoard);
router.post("/:boardId", createNewList);

module.exports = router;
