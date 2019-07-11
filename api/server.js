const express = require("express");
const cors = require("cors");
const helm = require("helmet");
const morg = require("morgan");
const usersRoute = require("./routes/usersRoute.js");

const server = express();

server.use(helm(), express.json(), morg("dev"));
server.use(cors());

usersRoute(server);

server.get("/", async (req, res) => {
  res.send("😋");
});

module.exports = server;
