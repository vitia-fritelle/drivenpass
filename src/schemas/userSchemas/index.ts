import Joi from "joi";

const userSigninSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(10).required(),
});

const userSignupSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(10).required(),
}).required();

const userSchemas = {
    userSigninSchema,
    userSignupSchema,
};

export default userSchemas;