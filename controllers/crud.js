const User = require("../models/crud");
const bcrypt = require('bcryptjs');

// var listData = '';
// Render CRUD View
const create = (req, res) => {
    // listData = this.list(req, res);
    // console.log(listData);  
    // destory whole session  : req.session.destroy();

    res.render("crud");

    // listData.then(result => {
    //     console.log(result);
    //     res.render("crud");
    // }).catch(err => {
    //     if (err)
    //         throw err;
    // });    
}

// Add User
const add = (req, res) => {   
    bcrypt.hash(req.body.password, 10, (err, hashpass) => {
        if (err) {
            res.json({status : 401, error : err});
        }

        let user = new User({
            name : req.body.name,
            phone : req.body.phone,
            email : req.body.email,
            password : hashpass
        });

        user.save().then(user => {
            // res.json({status : 200, message : 'User Successfully added.'});

            // TODO redirect after some time
            res.redirect(process.env.CRUD_BASE_URL+"/list"); 
        }).catch(err => {
            res.json({status : 201, message : 'Unable to create User.'});
        });
    });
}

// Fetch List of users
const list = (req, res) => {    
    User.find().then( result => {          
        res.render("list", {data : result});
    }).catch(err => {
        if (err) {
            res.json({status : 201, message : err});
        }
    });
} 

// Fetch record by id
const edit = (req, res) => {
    console.log(req.params);
    id = req.params.id;
    User.find({_id : id}).then( result => {        
        let password = result[0].password;
        console.log(password);
        res.render("crud", {data : result[0]});
    }).catch(err => {
        if (err) {
            res.json({status : 201, message : err});
        }
    });
}

// Update user details
const update = (req, res) => {       
    let userId = req.body.userId; 
    
    User.findByIdAndUpdate(userId, {
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email  
    }, {new: true}).then(user => {
        if (!user) {
            res.json({status : 404, message : 'User not found.'});            
        }

        res.json({status : 200, message : 'User Details Successfully Updated.'});        
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            res.json({status : 404, message : 'User not found.'});             
        }
        
        res.json({status : 201, message : 'Error updating user with id ' + userId});                 
    });
}

// delete user
const deleteUser = (req, res) => {
    let userId = req.params.id;    
    User.findByIdAndRemove(userId, {useNewUrlParser: true} ).then(user => {
        if (!user) {
            res.json({status : 404, message : 'User not found.'});
        }

        res.json({status : 200, message : 'User deleted successfully!'});       
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            res.json({status : 404, message : 'User not found.' + userId});            
        }

        res.json({status : 500, message : 'Could not delete user with id ' + userId});
    });
}

module.exports = {
    create,
    add,
    edit,
    list,
    update,
    deleteUser
}