const router = require("express").Router();
const {
  getAllCardsInBoard,
  createNewCard,
  updateCard
} = require("../services/cards.services");

router.get("/:boardId", getAllCardsInBoard);
router.post("/:boardId", createNewCard);
router.put("/:boardId", updateCard);

module.exports = router;
