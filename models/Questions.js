const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionsSchema = new Schema({
  problem: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
});

questionsSchema.set("toJSON", {
  transform: function (doc, ret) {
    const { _id, __v, ...rest } = ret;
    return rest;
  },
});

module.exports = mongoose.model("Questions", questionsSchema);
