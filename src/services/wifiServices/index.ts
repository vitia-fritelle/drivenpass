import repositories from '../../repositories';
import utils from '../../utils';

const { 
    insert, 
    retrieve, 
    retrieveMany, 
    remove 
} = repositories.wifiRepository;
const { CustomError } = utils.errorUtils;
const { secretKey } = utils.cryptoUtils;

async function insertWifi(
    title: string, 
    name: string, 
    password: string, 
    userId: number
) {
    const wifi = await insert({
        title, 
        name, 
        password: secretKey.encrypt(password), 
        userId
    });
    return wifi;
}

async function retrieveWifi(userId: number, id: number) {
    const wifi = await retrieve(id);
    if(!wifi) {
        throw new CustomError(404, 'This id is not registered!');
    }
    if(wifi.userId !== userId) {
        throw new CustomError(401, 'Unauthorized operation!');
    }
    return wifi;
}

async function retrieveWifis(userId: number) {
    const wifis = await retrieveMany(userId);
    return wifis;
}

async function removeWifi(userId: number, id: number) {
    await retrieveWifi(userId, id);
    const wifi = await remove(id);
    return wifi;
}

const wifiServices = {
    insertWifi,
    retrieveWifi,
    removeWifi,
    retrieveWifis
};

export default wifiServices;