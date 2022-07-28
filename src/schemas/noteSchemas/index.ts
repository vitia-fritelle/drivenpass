import Joi from "joi";

const noteSchema = Joi.object({
    title: Joi.string().max(50).required(),
    content: Joi.string().max(1000).required()
});

const noteSchemas = {
    noteSchema,
}

export default noteSchemas;