const express = require("express");
const { UserModel } = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.get("/", (req,res)=>{
    res.send({
        message:"user route gets all the user"
    })
})

userRouter.post("/register", async(req,res)=>{
    const {name,email,password} = req.body;
    bcrypt.hash(password, 10, async function(err, hash){
        if(err) return res.send({
            message: "something went wrong",
            status: 0
        });
        try{
        let user = new UserModel({name,email,password:hash})
        await user.save();
        res.send({
            message: "user created",
            status: 1,
        });
        }catch (error){
            res.send({
                message: error.message,
                status: 0
            })
        }
    })
})
userRouter.post("/login", async(req,res) => {
    const {email,password} = req.body;
    let option = {
        expiresIn: "15m"
    }
    try{
        let data = await UserModel.find({email});
        if(data.length > 0){
            let token = jwt.sign({ userId: data[0]._id }, "karishma", option);
            bcrypt.compare(password, data[0].password, function(err, result) {
                if(err) return res.send({message : "something went wrong :" + err, status:0});
                if(result){
                    res.send({
                        message: "user logged in successfully",
                        token: token,
                        status: 1,
                    });

                } else {
                    res.send({
                        message: "Incorrect password",
                        status: 0,
                    });
                }
            });
        } else {
            res.send({
                message: " User does not exist",
                status: 0,
            });
        }
    }catch(error) {
        res.send({
            message: error.message,
            status: 0,
        });
    }
});

module.exports = {userRouter}; 