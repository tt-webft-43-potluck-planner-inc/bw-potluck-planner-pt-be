const express = require("express");
const cors = require("cors");
const helm = require("helmet");
const morgan = require("morgan");
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("./routes/users-router.js");
const potlucksRouter = require("./routes/potlucks-router.js");

const server = express();

server.use(helm(), express.json(), morgan("dev"));
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/user", usersRouter);
server.use("/api/potlucks", potlucksRouter);

server.get("/", async (req, res) => {
  res.send("😋");
});

module.exports = server;
