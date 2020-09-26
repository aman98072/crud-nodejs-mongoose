const { register } = require("./register.schema");

module.exports = {
    validate: async (req, res, next) => {
        const value = await register.validate(req.body);        
        if (value.error) {
            res.json( {'status' : 201, 'message' : value.error.details[0].message} );
        } else {
            next();
        }
    }
}