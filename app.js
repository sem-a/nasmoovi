const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api", require("./routes/index"));
app.use("/api/users", require("./routes/user"));
app.use("/api/wedding", require("./routes/wedding"));
app.use("/api/portfolio", require("./routes/portfolio"));
app.use("/api/video", require("./routes/video"));

app.use((req, res, next) => {
  if (req.url === '/index.html' || req.url === '/index.php') {
    res.redirect(301, '/');
  } else {
    next();
  }
});

app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

module.exports = app;
