const router = require("express").Router();
const {
  getAllCardsInBoard,
  createNewCard
} = require("../services/cards.services");

router.get("/:boardId", getAllCardsInBoard);
router.post("/:boardId", createNewCard);

module.exports = router;
