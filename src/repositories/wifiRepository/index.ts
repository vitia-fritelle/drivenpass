import prisma from '../../database';
import { wifiData } from './types';

async function insert(wifi: wifiData) {
    return await prisma.wifi.create({
        data: wifi
    });
}

async function retrieve(id: number) {
    return await prisma.wifi.findUnique({
        where:{
            id,
        }
    })
}

async function retrieveMany(userId: number) {
    return await prisma.wifi.findMany({
        where:{
            userId,
        }
    })
}

async function remove(id: number) {
    return await prisma.wifi.delete({
        where: {
            id,
        }
    })
}

const wifiRepository = {
    insert,
    retrieve,
    retrieveMany,
    remove,
};

export default wifiRepository;
