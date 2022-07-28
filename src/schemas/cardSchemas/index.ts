import Joi from 'joi';

const cardSchema = Joi.object({
    number: Joi.number().integer().required(),
    cardholderName: Joi.string().required(),
    securityCode: Joi.number().integer().max(999).required(),
    expirationDate: Joi.date().required(),
    password: Joi.string().required(), 
    isVirtual: Joi.boolean().required(),
    type: Joi.string().valid('credit', 'debit', 'both').required(),
    title: Joi.string().required()
});

const cardSchemas = {
    cardSchema,
};

export default cardSchemas;