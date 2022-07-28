import { UserData } from './types';
import prisma from '../../database';

async function insert(user: UserData) {
    return prisma.user.create({
        data: user,
    });
};

async function getUserById(userId: number) {
    return prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
};

async function getUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email
        },
    });
};

const userRepository = {
    insert,
    getUserById,
    getUserByEmail
}

export default userRepository;