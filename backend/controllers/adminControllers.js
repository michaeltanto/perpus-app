const db = require("../models");
const transporter = require("../helpers/transporter");
const bcrypt = require("bcrypt");
const user = db.Admin;
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

module.exports = {

    register: async (req, res) => {

        try{
            const {username, email, password} = req.body

            if (password.length < 8) throw "password should be more 8 character"

            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);

            const data = await user.create({
                username,
                email,
                password: hashPass,
            });

            const token = jwt.sign({id: data.id}, "perpusApp", {expiresIn:"3d"});

            res.status(200).send({
                message: "Register Success",
                data,
                token
            })

        }
        catch(err) {
            res.status(400).send(err)
        }

    },

    login: async (req, res) => {

        try{

            const {data, password} = req.body

            const isUserExist = await  user.findOne({
                where: {
                    [Op.or]: {
                        username: data ? data : "",
                        email: data ? data : ""

                    }
                },
                raw: true
            });
            console.log(isUserExist)

            if(isUserExist === null) throw "Account not found";

            const isAdmin = await bcrypt.compare(password, isUserExist.password);
            if(!isAdmin) throw "username/email and password incorrect";

            const token = jwt.sign(
                {username: isUserExist.username, id: isUserExist.id},
                "perpusApp"
            );
            res.status(200).send({
                user: {
                    username: isUserExist.username,
                    id: isUserExist.id
                },
                token,
            })
        }
        catch(err){
        res.status(400).send(err)
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
              // id: result[0].id,
              username: result[0].username,
            });
          } catch (err) {
            res.status(400).send(err);
          }
      },
}