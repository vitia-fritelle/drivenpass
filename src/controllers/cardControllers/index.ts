import { Request, Response, NextFunction } from "express";
import services from "../../services";
import utils from "../../utils";

const { insertCard, retrieveCard, retrieveCards, removeCard } = services.cardServices;
const { getUserId } = services.userServices;
const { formatToken } = utils.formatUtils;

async function createCard(_req: Request, res: Response, next: NextFunction) {
    try {
        const {
            number, 
            cardholderName, 
            securityCode, 
            expirationDate, 
            password, 
            isVirtual, 
            type, 
            title
        } = res.locals.body;
        const token = await formatToken(res.locals.headers.authorization);
        const userId = await getUserId(token);
        await insertCard(
            String(number), 
            cardholderName, 
            String(securityCode), 
            new Date(expirationDate), 
            password, 
            isVirtual, 
            type, 
            title, 
            userId
        );
        res.sendStatus(201);
    } catch (e) {
        next(e);
    }
}

async function getCard(_req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = res.locals.params;
        const token = await formatToken(res.locals.headers.authorization);
        const userId = await getUserId(token);
        const card = await retrieveCard(userId, parseInt(id,10));
        res.status(200).send(card);
    } catch (e) {
        next(e);
    }
}

async function getCards(_req: Request, res: Response, next: NextFunction) {
    try {
        const token = await formatToken(res.locals.headers.authorization);
        const userId = await getUserId(token);
        const cards = await retrieveCards(userId);
        res.status(200).send(cards);
    } catch (e) {
        next(e);
    }
}

async function deleteCard(_req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = res.locals.params;
        const token = await formatToken(res.locals.headers.authorization);
        const userId = await getUserId(token);
        await removeCard(userId, parseInt(id,10));
        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
}
const cardControllers = {
    createCard,
    getCard,
    getCards,
    deleteCard,
}

export default cardControllers;