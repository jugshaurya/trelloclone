const Activity = require("../models/activities");

// Get all activities
const getAllActivities = async (req, res, next) => {
  try {
    // TODO : Validation
    const boardId = req.params.boardId;
    const activities = await Activity.find({ boardId });
    res.json(activities);
  } catch (e) {
    next(e);
  }
};

// Create a new Activity
const createNewActivity = async (req, res, next) => {
  try {
    // TODO client side data validation
    const boardId = req.params.boardId;
    const { text } = req.body;
    const textWithUser = `**${req.user.username}** ${text}`;
    const newActivity = new Activity({
      text: textWithUser,
      boardId,
      userId: req.user._id
    });

    res.json(await newActivity.save());
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllActivities,
  createNewActivity
};
