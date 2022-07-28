import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationError } from "joi";
import utils from "../../utils";

const {CustomError} = utils.errorUtils;

type ValidationsType  = {
    body?: Joi.ObjectSchema
    headers?: Joi.ObjectSchema
    query?: Joi.ObjectSchema
    params?: Joi.ObjectSchema
}

function validateSchema(validations: ValidationsType) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await Promise.all(
                Object.entries(validations).map((entry) => {
                    const [type, schema] = entry;
                    return schema.validateAsync(req[type as keyof Request]);
                })
            );
            res.locals = req;
            next();
        } catch (e) {
            next(new CustomError(422, (e as ValidationError).message));
        }
    };
}

const validationMiddlewares = {
    validateSchema,
};

export default validationMiddlewares;
