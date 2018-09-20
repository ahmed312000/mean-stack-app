var express = require('express');
var router = express.Router();
var User = require('../models/user')
var cors = require('cors');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')



router.post('/', cors() , function (req, res, next) {
    let myPassword
    const saltRounds = 12;
    const myPlaintextPassword = req.body.password;


    var salt = bcrypt.genSaltSync(saltRounds);
    var hashedPassword = bcrypt.hashSync(req.body.password , salt);

    var user = new User({
        username : req.body.username ,
        email : req.body.email ,
        password : hashedPassword
    })

    user.save((err , result) => {

            if(err) {
                return res.status(500).json({
                    title : "there is an error", // error
                    error : err
                });
            }
          
            res.status(201).json({
                title : "saved user", // goood
                obj  : result
            })
        
    })

})


router.put('/username-validation' , (req , res , next) => {
    User.findOne({ username : req.body.username } , (err , user) => {
        if(err) {
            return res.status(500).json({
                title : "an error occured",
                error : err
            })
        }
        if(user) {
            return res.status(201).json({
                title : "username Taken"
            })
        }

        res.status(200).json({
            title : "username is uniqe"
        })
    });

})


router.post('/login' , (req , res , next) => {
    User.findOne({username : req.body.username} , (err , user) => {
        if(err) {
            return res.status(500).json({
                title : "an error occured",
                error : err
            })
        }
        if(!user) {
            return res.status(401).json({
                title : "login failed",
                error : {message : "username or password incorrect"}
            })
        }
        if(!bcrypt.compareSync(req.body.password , user.password)) {
            return res.status(401).json({
                title : "login failed",
                error : {message : "username or password incorrect"}
            })
        }
        let token = jwt.sign({user : user } , ".`3m`wyf5;qJDe/^&aX})/,Ab(ykH}sFvr5W{\h-HyPZC~8g" , { expiresIn : 3.154e+7 })
        res.status(200).json({
            title : "successful" ,
            token : token ,
            userId : user._id
        })
    })
})














module.exports = router ;
