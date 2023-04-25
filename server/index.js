const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const UserModel = require("./models/user");
const cors = require("cors");
// const jobs = require("./routes/jobs");
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/LinkedUs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getData", (req, res) => {
  UserModel.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/addJobs", async (req, res) => {
  const user = {
    title: req.body.title,
    content: req.body.content,
  };
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(newUser);
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
