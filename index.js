const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const { mongoUrl } = require("./keys");

require("./models/User");
const requireToken = require("./middleware/requireToken");
const authRoutes = require("./routes/authRoutes");
const profile = require("./routes/profile");

app.use(bodyParser.json());
app.use(authRoutes, profile);

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log("this is error", err);
});

app.get("/", requireToken, (req, res) => {
  res.send("your email is " + req.user.email);
});

app.use(bodyParser.json());

app.post("/", (req, res) => {
  res.send("testing connection");
});

app.listen(PORT, () => {
  console.log("server running: " + PORT);
});
