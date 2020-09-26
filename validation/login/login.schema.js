const joi = require('@hapi/joi');
const schema = {
    login: joi.object({        
        email : joi.string().email().required(),
        password : joi.required()
    })  
}

module.exports = schema;