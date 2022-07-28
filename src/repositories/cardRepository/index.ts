import prisma from '../../database';
import { cardData } from './types';

async function insert(card: cardData) {
    return await prisma.card.create({
        data: card
    });
}

async function retrieve(id: number) {
    return await prisma.card.findUnique({
        where:{
            id,
        }
    })
}

async function retrieveMany(userId: number) {
    return await prisma.card.findMany({
        where:{
            userId,
        }
    })
}

async function remove(id: number) {
    return await prisma.card.delete({
        where: {
            id,
        }
    })
}

const cardRepository = {
    insert,
    retrieve,
    retrieveMany,
    remove,
};

export default cardRepository;
