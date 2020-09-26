const { login } = require("./login.schema");

module.exports = {
    validate: async (req, res, next) => {
        const value = await login.validate(req.body);        
        if (value.error) {
            res.send( {'status' : 201, 'message' : value.error.details[0].message} );            
        } else {
            next();
        }
    }
}