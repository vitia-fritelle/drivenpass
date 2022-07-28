import Joi from 'joi';

const idSchema = Joi.object({
    id: Joi.number().integer().required(),
});

const paramSchemas = {
    idSchema,
}

export default paramSchemas;