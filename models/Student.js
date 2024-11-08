const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  img: {
    type: String,
    default:
      "https://cdn-icons-png.freepik.com/256/6645/6645221.png?semt=ais_hybrid",
  },
  score: {
    type: Number,
    default: 0,
  },
});

module.exports = Student = mongoose.model("students", userSchema);