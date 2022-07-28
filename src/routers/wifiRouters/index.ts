import { Router } from "express";
import middlewares from "../../middlewares";
import schemas from "../../schemas";
import controllers from "../../controllers";

const router = Router();
const { validateSchema } = middlewares.validationMiddlewares;
const { wifiSchema } = schemas.wifiSchemas;
const { authSchema } = schemas.headerSchemas;
const { idSchema } = schemas.paramSchemas;
const { createWifi, getWifi, getWifis, deleteWifi } = controllers.wifiControllers;

router.post(
    '/', 
    validateSchema({body: wifiSchema, headers: authSchema}), 
    createWifi
);

router.get(
    '/',
    validateSchema({headers: authSchema}),
    getWifis
);

router.get(
    '/:id',
    validateSchema({headers: authSchema, params: idSchema}),
    getWifi
)

router.delete(
    '/:id',
    validateSchema({headers: authSchema, params: idSchema}),
    deleteWifi
)

export default router;