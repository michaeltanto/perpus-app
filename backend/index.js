const express = require("express")
const port = 3000
const server = express()
const db = require("./models")

server.use(express.json())


server.get("/", (req, res) => {

    res.status(200).send("Welcome to My API")
})

console.log("register")



server.listen( port, () =>{
    // db.sequelize({alter:true})
    console.log(`Succes Running at PORT: ${port}`)
})