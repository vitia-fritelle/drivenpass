import { Router } from "express";
import middlewares from "../../middlewares";
import schemas from "../../schemas";
import controllers from "../../controllers";

const router = Router();
const { validateSchema } = middlewares.validationMiddlewares;
const { noteSchema } = schemas.noteSchemas;
const { authSchema } = schemas.headerSchemas;
const { idSchema } = schemas.paramSchemas;
const { createNote, getNote, getNotes, deleteNote } = controllers.noteControllers;

router.post(
    '/', 
    validateSchema({body: noteSchema, headers: authSchema}), 
    createNote
);

router.get(
    '/',
    validateSchema({headers: authSchema}),
    getNotes
);

router.get(
    '/:id',
    validateSchema({headers: authSchema, params: idSchema}),
    getNote
)

router.delete(
    '/:id',
    validateSchema({headers: authSchema, params: idSchema}),
    deleteNote
)

export default router;