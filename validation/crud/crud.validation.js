const { crud } = require("./crud.schema");

module.exports = {
    validate: async (req, res, next) => {
        const value = await crud.validate(req.body);      
        try {
            if (value.error) {                        
                // res.render('crud', {'error' : value.error.details[0].message} );   
                // TODO redirect after some time
                res.redirect(process.env.CRUD_BASE_URL);                  
            } else {
                next();
            }
        } catch(err) {
            if (err)
            throw err;
        }
    }
}