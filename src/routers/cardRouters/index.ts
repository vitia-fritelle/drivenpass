import { Router } from "express";
import middlewares from "../../middlewares";
import schemas from "../../schemas";
import controllers from "../../controllers";

const router = Router();
const { validateSchema } = middlewares.validationMiddlewares;
const { cardSchema } = schemas.cardSchemas;
const { authSchema } = schemas.headerSchemas;
const { idSchema } = schemas.paramSchemas;
const { createCard, getCard, getCards, deleteCard } = controllers.cardControllers;

router.post(
    '/', 
    validateSchema({body: cardSchema, headers: authSchema}), 
    createCard
);

router.get(
    '/',
    validateSchema({headers: authSchema}),
    getCards
);

router.get(
    '/:id',
    validateSchema({headers: authSchema, params: idSchema}),
    getCard
)

router.delete(
    '/:id',
    validateSchema({headers: authSchema, params: idSchema}),
    deleteCard
)

export default router;