const Joi = require('joi');
export class SchemaValidator {
    // sign-up schema
    public authSchema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string()
            .email()
            .required(),    
        password: Joi.string().required(),
        mobile_number: Joi.string().required()
    });

    // sign-in schema
    public login = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    });

}
