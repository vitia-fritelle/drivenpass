import { Router } from "express";
import controllers from '../../controllers'
import middlewares from "../../middlewares";
import schemas from '../../schemas';

const {validateSchema} = middlewares.validationMiddlewares;
const {userSignupSchema, userSigninSchema} = schemas.userSchemas;
const {createUser, loginUser} = controllers.userControllers;

const router = Router();

router.post(
    '/signup',
    validateSchema({body: userSignupSchema}),
    createUser
);

router.post(
    '/signin',
    validateSchema({body: userSigninSchema}),
    loginUser
)

export default router;