const express = require("express");
const port = 3000;
const server = express();
const db = require("./models");
const cors = require("cors")

server.use(express.json());
server.use(cors());


const {bookRouters} = require("./routers");

server.use("/book", bookRouters);

server.listen(port, () => {
  // db.sequelize.sync({alter:true})
  console.log(`Success Running at PORT: ${port}`);
});
