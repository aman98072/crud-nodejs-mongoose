const User = require("../models/register");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const viewLogin = (req, res) => {
    res.render("login");
}

const login = (req, res) => {    
    let email = req.body.email;
    let password = req.body.password;

    User.findOne( { email } ).then(user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.json({status : 201, error : err});
                }
                
                if (result) {
                    let token = jwt.sign({name : user.name}, process.env.SECRET, {expiresIn : '24h'});
                    req.session.token = token;
                    res.redirect('/crud');
                    // res.json({status: 200, message : 'Login Successfully.', token});
                } else {
                    res.json({status: 200, message : 'Password does not matched.'});
                }
            });
        } else {
            res.json({status: 200, message : 'User not found in DB.'});
        }
    });
}

const isLogined = (req, res, next) => {
    let token = req.session.token;
    if (!token) {
        res.redirect("/login");
    } 

    next();
}

module.exports = {
    viewLogin,
    login,
    isLogined
}