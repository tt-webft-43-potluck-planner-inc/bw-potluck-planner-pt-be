const express = require("express");
const cors = require("cors");
const helm = require("helmet");
const morgan = require("morgan");
const authRouter = require("../auth/auth-router.js");

const server = express();

server.use(helm(), express.json(), morgan("dev"));
server.use(cors());

server.use("/api/auth", authRouter);

server.get("/", async (req, res) => {
  res.send("😋");
});

module.exports = server;
