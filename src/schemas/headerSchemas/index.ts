import Joi from 'joi';

const authSchema = Joi.object({
    authorization: Joi.string().pattern(/^Bearer/).required(),
}).options({ allowUnknown: true });

const headerSchemas = {
    authSchema,
};

export default headerSchemas;