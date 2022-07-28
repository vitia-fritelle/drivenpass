import { Router } from "express";
import middlewares from "../../middlewares";
import schemas from "../../schemas";
import controllers from "../../controllers";

const router = Router();
const { validateSchema } = middlewares.validationMiddlewares;
const { credentialSchema } = schemas.credentialSchemas;
const { authSchema } = schemas.headerSchemas;
const { idSchema } = schemas.paramSchemas;
const { createCredential, getCredential, getCredentials, deleteCredential } = controllers.credentialControllers;

router.post(
    '/', 
    validateSchema({body: credentialSchema, headers: authSchema}), 
    createCredential
);

router.get(
    '/',
    validateSchema({headers: authSchema}),
    getCredentials
);

router.get(
    '/:id',
    validateSchema({headers: authSchema, params: idSchema}),
    getCredential
)

router.delete(
    '/:id',
    validateSchema({headers: authSchema, params: idSchema}),
    deleteCredential
)

export default router;