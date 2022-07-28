import { Request, Response, NextFunction } from "express";
import services from "../../services";

const {insertUser, authenticateUser} = services.userServices;

async function createUser(_req: Request, res: Response, next: NextFunction) {
    try {
        const {email, password} = res.locals.body;
        await insertUser(email, password)
        res.sendStatus(201);
    } catch (e) {
        next(e);
    }
}

async function loginUser(_req: Request, res: Response, next: NextFunction) {
    try {
        const {email, password} = res.locals.body;
        const token = await authenticateUser(email, password);
        res.status(200).json({token});
    } catch (e) {
        next(e);
    }
}

const userControllers = {
    createUser,
    loginUser,

}

export default userControllers;