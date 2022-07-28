import prisma from '../../database';
import { noteData } from './types';

async function insert(note: noteData) {
    return await prisma.note.create({
        data: note
    });
}

async function retrieve(id: number) {
    return await prisma.note.findUnique({
        where:{
            id,
        }
    })
}

async function retrieveMany(userId: number) {
    return await prisma.note.findMany({
        where:{
            userId,
        }
    })
}

async function remove(id: number) {
    return await prisma.note.delete({
        where: {
            id,
        }
    })
}

const noteRepository = {
    insert,
    retrieve,
    retrieveMany,
    remove,
};

export default noteRepository;
