const express = require("express");

const port = process.env.PORT || 3001;

require("dotenv/config");

const path = require("path");

const bodyParser = require("body-parser");
const db = require("./config/mongoose");
const app = express();
const morgan = require("morgan");

const cors = require("cors");

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: "Stage server is running" });
});

app.use("/v1/user/api", require("./router/user"));

app.listen(port, (err) => {
  if (err) {
    console.log("something wrong");
    return "failed";
  }
  console.log("server running on port:", port);
});