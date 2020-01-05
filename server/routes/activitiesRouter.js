const router = require("express").Router();
const {
  getAllActivities,
  createNewActivity
} = require("../services/activities.services");

router.get("/:boardId", getAllActivities);
router.post("/:boardId", createNewActivity);

module.exports = router;
