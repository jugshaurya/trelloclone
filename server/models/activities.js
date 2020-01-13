const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const attachActivitiesHooks = require("../hooks/activities.hooks");
const activitiesSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "boards",
      required: true
    },
    cardId: {
      type: Schema.Types.ObjectId,
      ref: "cards"
    }
  },
  {
    timestamps: true
  }
);

attachActivitiesHooks(activitiesSchema);

const Activities = mongoose.model("activities", activitiesSchema);

module.exports = Activities;
