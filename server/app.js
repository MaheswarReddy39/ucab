const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Import Routes
const routes = require("./routes");

// Use Routes
app.use("/", routes);
app.use("/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

module.exports = app;