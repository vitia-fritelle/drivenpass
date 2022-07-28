import Joi from 'joi';

const wifiSchema = Joi.object({
    title: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required()
});

const wifiSchemas = {
    wifiSchema,
};

export default wifiSchemas;