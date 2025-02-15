const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Student = require("./models/Student");
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

// get all students
app.get("/students", async (req, res) => {
  try {
    const data = await Student.find().sort({ score: -1 });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(400).json({ status: false, error });
  }
});

// add new student
app.post("/students", async (req, res) => {
  try {
    const { name, img } = req.body;
    const newUser = new Student({
      name,
      img,
    });
    await newUser.save();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ status: false, error });
  }
});
// update user score
app.put("/students/first/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await Student.findByIdAndUpdate(id, {
      $inc: { score: 3 },
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ status: false, error });
  }
});
app.put("/students/second/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await Student.findByIdAndUpdate(id, {
      $inc: { score: 2 },
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ status: false, error });
  }
});
app.put("/students/third/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await Student.findByIdAndUpdate(id, {
      $inc: { score: 1 },
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ status: false, error });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ status: false, error });
  }
});

// listen
app.listen(PORT, () => {
  console.log("Server is up and running");
});
