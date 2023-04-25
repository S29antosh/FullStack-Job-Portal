const express = require("express");
const router = express.Router();
const UserModel = require("../models/user");

router.get("/getData", (req, res) => {
    UserModel.find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Internal Server Error");
      });
  });

module.exports = router;
