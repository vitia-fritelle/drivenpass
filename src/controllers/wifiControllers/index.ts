import { Request, Response, NextFunction } from "express";
import services from "../../services";
import utils from "../../utils";

const { insertWifi, retrieveWifi, retrieveWifis, removeWifi } = services.wifiServices;
const { getUserId } = services.userServices;
const { formatToken } = utils.formatUtils;

async function createWifi(_req: Request, res: Response, next: NextFunction) {
    try {
        const {title,name,password} = res.locals.body;
        const token = await formatToken(res.locals.headers.authorization);
        const userId = await getUserId(token);
        await insertWifi(title, name, password, userId);
        res.sendStatus(201);
    } catch (e) {
        next(e);
    }
}

async function getWifi(_req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = res.locals.params;
        const token = await formatToken(res.locals.headers.authorization);
        const userId = await getUserId(token);
        const wifi = await retrieveWifi(userId, parseInt(id,10));
        res.status(200).send(wifi);
    } catch (e) {
        next(e);
    }
}

async function getWifis(_req: Request, res: Response, next: NextFunction) {
    try {
        const token = await formatToken(res.locals.headers.authorization);
        const userId = await getUserId(token);
        const wifis = await retrieveWifis(userId);
        res.status(200).send(wifis);
    } catch (e) {
        next(e);
    }
}

async function deleteWifi(_req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = res.locals.params;
        const token = await formatToken(res.locals.headers.authorization);
        const userId = await getUserId(token);
        await removeWifi(userId, parseInt(id,10));
        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
}
const wifiControllers = {
    createWifi,
    getWifi,
    getWifis,
    deleteWifi,
}

export default wifiControllers;