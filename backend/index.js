const express = require("express")
const port = 2000
const server =  express()
const db = require("./models")
const cors = require("cors");
const bearerToken = require("express-bearer-token");

server.use(express.json());
server.use(cors());
server.use(bearerToken());


server.get("/", (req, res) => {

    res.status(200).send("Welcome to My API")
})

console.log("register")


