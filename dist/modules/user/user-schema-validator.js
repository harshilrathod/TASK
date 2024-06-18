"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaValidator = void 0;
var Joi = require('joi');
var SchemaValidator = /** @class */ (function () {
    function SchemaValidator() {
        // sign-up schema
        this.authSchema = Joi.object({
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            // email: Joi.string()
            //     .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
            //     .required(),
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string().required(),
            mobile_number: Joi.number().required(),
            isd_code: Joi.string().required(),
            recaptcha: Joi.string(),
            source: Joi.string()
        });
        // sign-in schema
        this.signInSchema = Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
        });
        // forgot password schema
        this.forgotPassSchema = Joi.object({
            email: Joi.string().required(),
            reset_password_token_expiry: Joi.number().required(),
        });
        // forgot password token verification schema
        this.forgotPassTokenSchema = Joi.object({
            token: Joi.string().required(),
        });
        // forgot password reset schema
        this.forgotPassResetSchema = Joi.object({
            id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
            password: Joi.string().required(),
            company_id: Joi.string(),
        });
        // sign-up verification schema
        this.signUpVerificationSchema = Joi.object({
            token: Joi.string().required(),
        });
    }
    return SchemaValidator;
}());
exports.SchemaValidator = SchemaValidator;
