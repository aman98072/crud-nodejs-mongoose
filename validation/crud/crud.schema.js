const joi = require('@hapi/joi');
const schema = {
    crud: joi.object({        
        name : joi.required(),
        phone : joi.number().integer().default(10),
        email : joi.string().email().required(),
        password : joi.required()
    })  
}

module.exports = schema;