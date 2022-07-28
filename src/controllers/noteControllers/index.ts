import { Request, Response, NextFunction } from "express";
import services from "../../services";
import utils from "../../utils";

const { insertNote, retrieveNote, retrieveNotes, removeNote } = services.noteServices;
const { getUserId } = services.userServices;
const { formatToken } = utils.formatUtils;

async function createNote(_req: Request, res: Response, next: NextFunction) {
    try {
        const {title, content} = res.locals.body;
        const token = await formatToken(res.locals.headers.authorization);
        const userId = await getUserId(token);
        await insertNote(title, content, userId);
        res.sendStatus(201);
    } catch (e) {
        next(e);
    }
}

async function getNote(_req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = res.locals.params;
        const token = await formatToken(res.locals.headers.authorization);
        const userId = await getUserId(token);
        const note = await retrieveNote(userId, parseInt(id,10));
        res.status(200).send(note);
    } catch (e) {
        next(e);
    }
}

async function getNotes(_req: Request, res: Response, next: NextFunction) {
    try {
        const token = await formatToken(res.locals.headers.authorization);
        const userId = await getUserId(token);
        const notes = await retrieveNotes(userId);
        res.status(200).send(notes);
    } catch (e) {
        next(e);
    }
}

async function deleteNote(_req: Request, res: Response, next: NextFunction) {
    try {
        const {id} = res.locals.params;
        const token = await formatToken(res.locals.headers.authorization);
        const userId = await getUserId(token);
        await removeNote(userId, parseInt(id,10));
        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
}
const noteControllers = {
    createNote,
    getNote,
    getNotes,
    deleteNote,
}

export default noteControllers;