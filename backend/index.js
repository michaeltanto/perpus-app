const express = require("express");
const port = 2000;
const server = express();
const db = require("./models");
const cors = require("cors")
const bearerToken = require("express-bearer-token");

server.use(express.json());
server.use(cors());
server.use(bearerToken());

const {bookRouters} = require("./routers");
const {userRouters} = require("./routers");
const {adminRouters} = require("./routers")
server.use("/users", userRouters)
server.use("/book", bookRouters);
server.use("/admin", adminRouters)

server.listen(port, () => {
  // db.sequelize.sync({alter:true})
  console.log(`Success Running at PORT: ${port}`);
});
