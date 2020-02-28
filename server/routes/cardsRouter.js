const router = require("express").Router();
const { upload } = require("../multer/multer");
const {
  getAllCardsInBoard,
  createNewCard,
  updateCard,
  uploadImage
} = require("../services/cards.services");

router.post("/uploadmulter", upload.single("imageData"), uploadImage);

router.get("/:boardId", getAllCardsInBoard);
router.post("/:boardId", createNewCard);
router.put("/:boardId", updateCard);

module.exports = router;
