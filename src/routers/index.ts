import { Router } from "express"
import authRouters from './authRouters';
import credentialRouters from './credentialRouters';
import noteRouters from './noteRouters';
import cardRouters from './cardRouters';
import wifiRouters from './wifiRouters';


const router = Router();

const routers = [
    {
        path: '/auth',
        subRouter: authRouters,
    },
    {
        path: '/credential',
        subRouter: credentialRouters
    },
    {
        path: '/note',
        subRouter: noteRouters
    },
    {
        path: '/card',
        subRouter: cardRouters
    },
    {
        path: '/wifi',
        subRouter: wifiRouters
    }
];

routers.forEach(({ path, subRouter }) => router.use(path, subRouter));

export default router;

