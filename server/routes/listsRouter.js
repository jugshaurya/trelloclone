const router = require("express").Router();
const {
  getAllListsInBoard,
  createNewList,
  deleteList
} = require("../services/lists.services");

router.get("/:boardId", getAllListsInBoard);
router.post("/:boardId", createNewList);
router.delete("/:boardId", deleteList);

module.exports = router;
