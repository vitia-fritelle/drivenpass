import Joi from 'joi';

const credentialSchema = Joi.object({
    title: Joi.string().required(),
    url: Joi.string().uri().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
});

const credentialSchemas = {
    credentialSchema,
}

export default credentialSchemas;