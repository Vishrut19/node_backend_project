const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "Questions",
    required: true,
  },
  selectedOption: {
    type: String,
    required: true,
  },
});

answerSchema.set("toJSON", {
  transform: function (doc, ret) {
    const { _id, __v, ...rest } = ret;
    return rest;
  },
});

module.exports = mongoose.model("Answers", answerSchema);
