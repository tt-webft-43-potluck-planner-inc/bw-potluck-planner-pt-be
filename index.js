require("dotenv").config();
const server = require("./api/server.js");

const port = process.env.PORT || 6666;

server.listen(port, () => {
  console.log(
    `🍲😋🍷👩 potluck sever is listening on port ${port} 🍽🙋🍷🎶👨‍🎤🤵`
  );
});
