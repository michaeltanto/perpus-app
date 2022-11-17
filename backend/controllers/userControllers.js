const db = require("../models");
const transporter = require("../helpers/transporter");
const bcrypt = require("bcrypt");
const user = db.User;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const handlebars = require("handlebars");

module.exports = {

register: async (req, res) => {
    try{
        const { NIM, Username, Email, Password, Password_confirmation } =
        req.body;

      if (Password !== Password_confirmation) throw "password lu salah";

      if (Password.length < 8) throw "Password min 8 character";

      const salt = await bcrypt.genSalt(10);

      const hashPass = await bcrypt.hash(Password, salt);

      const data = await user.create({
        NIM,
        Username,
        Email,
        Password: hashPass,
      });
      // console.log(data.id);

      const token = jwt.sign({ id: data.id }, "perpusApp", { expiresIn: "1h" });

      const tempEmail = fs.readFileSync("./template/email.html", "utf-8");
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        Username,
        link: `http://localhost:3000/verification/${token}`,
      });

      await transporter.sendMail({
        from: "Admin",
        to: Email,
        subject: "Verification User",
        html: tempResult,
      });

      res.status(200).send("Register Success");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
},
login: async (req, res) => {
    try{
        const {NIM, Password} = req.body;
        console.log(Password)

        const isNimExist = await user.findOne({
            where: {
                NIM, 
                // : data ? data : "",
                // Username : data ? data : "",
                // Email : data ? data : "",

              
            },
            raw: true
        });
        console.log(isNimExist)

        if(!isNimExist) throw "NIM not Found";
        console.log(isNimExist.Password)
        const isValid = await bcrypt.compare(Password, isNimExist.Password);

        if(!isValid) throw "NIM and Password Incorrect";

        // const payload = {id: isNimExist.id, isAdmin: isNimExist.isAdmin}
        const token = jwt.sign(
            { NIM: isNimExist.NIM, id: isNimExist.id },
            "perpusApp"
          );


        res.status(200).send({
            user: {
              NIM: isNimExist.NIM,
              id: isNimExist.id,
            },
            token,
        });
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }
},
keepLogin: async (req, res) => {
    try {
        const verify = jwt.verify(req.token, "perpusApp");
        console.log(verify);
        const result = await user.findAll({
          where: {
            id: verify.id,
          },
        });
  
        res.status(200).send({
          id: result[0].id,
          NIM: result[0].NIM,
        });
      } catch (err) {
        res.status(400).send(err);
      }
  },
verification: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, "perpusApp");
      console.log(verify);

      await user.update(
        {
          isVerified: true,
        },
        {
          where: {
            id: verify.id,
          },
        }
      );
      res.status(200).send("Success Verification");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
}