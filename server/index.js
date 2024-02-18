const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
const jwt = require('jsonwebtoken')

app.use(
  cors({
    origin: "http://localhost:2001",
  })
);
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/registration");

app.listen(2001, () => {
  console.log("server started");
});

app.get("/test", (req, res) => {
  res.send("hello there!");
});

app.post("/register", async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({status: "duplicate email"})
  }
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign({
        email: user.email,
    }, 'mySecret')
    return res.json({ status: "ok" , user : token});
  } else {
    return res.json({ status: "error" , user : false });
  }
});
