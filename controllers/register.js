const AdminUser = require("../models/register");
const bcrypt = require('bcryptjs');

const view = (req, res) => {
    res.render("register");
}

const create = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hashpass) => {
        if (err) {
            res.json({status : 401, error : err});
        }

        let user = new AdminUser({
            name : req.body.name,
            email : req.body.email,
            password : hashpass
        });

        user.save().then(user => {
            res.json({status : 200, message : 'Admin User Successfully added.'});
        }).catch(err => {
            res.json({status : 201, message : 'Unable to create User.'});
        });
    });
}

module.exports = {
    create,
    view
}