import { Request, Response, NextFunction } from "express";
import services from "../../services";
import utils from "../../utils";

const { insertCredential, retrieveCredential, retrieveCredentials, removeCredential } = services.credentialServices;
const { getUserId } = services.userServices;
const { formatToken } = utils.formatUtils;

async function createCredential(_req: Request, res: Response, next: NextFunction) {
    try {
        const {url, username, password, title} = res.locals.body;
        const token = await formatToken(res.locals.headers.authorization);
        const userId = await getUserId(token);
        await insertCredential(url, username, password, title, userId);
        res.sendStatus(201);
    } catch (e) {
        next(e);
    }
}

async function getCredential(_req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = res.locals.params;
        const token = await formatToken(res.locals.headers.authorization);
        const userId = await getUserId(token);
        const credential = await retrieveCredential(userId, parseInt(id,10));
        res.status(200).send(credential);
    } catch (e) {
        next(e);
    }
}

async function getCredentials(_req: Request, res: Response, next: NextFunction) {
    try {
        const token = await formatToken(res.locals.headers.authorization);
        const userId = await getUserId(token);
        const credentials = await retrieveCredentials(userId);
        res.status(200).send(credentials);
    } catch (e) {
        next(e);
    }
}

async function deleteCredential(_req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = res.locals.params;
        const token = await formatToken(res.locals.headers.authorization);
        const userId = await getUserId(token);
        await removeCredential(userId, parseInt(id,10));
        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
}
const credentialControllers = {
    createCredential,
    getCredential,
    getCredentials,
    deleteCredential,
}

export default credentialControllers;