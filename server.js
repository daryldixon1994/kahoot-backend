const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/Student");
require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(cors());
// cors
//
const PORT = 5000 || process.env.PORT;
const URI = process.env.URI;
//
mongoose
  .connect(URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => console.log(err));

app.get("/students", async (req, res) => {
  try {
    const data = await User.find().sort({ score: -1 });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(400).json({ status: false, error });
  }
});
app.post("/students", async (req, res) => {
  try {
    const { name, img, score } = req.body;
    const newUser = new User({
      name,
      img,
      score,
    });
    await newUser.save();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ status: false, error });
  }
});
app.put("/students/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await User.findByIdAndUpdate(id, {
      $inc: { score: 3 },
    });

    res.status(204).end();
  } catch (error) {
    res.status(400).json({ status: false, error });
  }
});

// listen
app.listen(PORT, () => {
  console.log("Server is up and running");
});
