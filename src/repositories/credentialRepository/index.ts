import prisma from '../../database';
import { credentialData } from './types';

async function insert(credential: credentialData) {
    return await prisma.credential.create({
        data: credential
    });
}

async function retrieve(id: number) {
    return await prisma.credential.findUnique({
        where:{
            id,
        }
    })
}

async function retrieveMany(userId: number) {
    return await prisma.credential.findMany({
        where:{
            userId,
        }
    })
}

async function remove(id: number) {
    return await prisma.credential.delete({
        where: {
            id,
        }
    })
}

const credentialRepository = {
    insert,
    retrieve,
    retrieveMany,
    remove,
};

export default credentialRepository;
