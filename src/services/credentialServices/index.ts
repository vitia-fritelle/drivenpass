import repositories from '../../repositories';
import utils from '../../utils';

const { 
    insert, 
    retrieve, 
    retrieveMany, 
    remove 
} = repositories.credentialRepository;
const { secretKey } = utils.cryptoUtils;
const {CustomError} = utils.errorUtils;

async function insertCredential(
    url: string, 
    username: string, 
    password: string, 
    title: string, 
    userId: number
) {
    const encryptedPassword = secretKey.encrypt(password); 
    const credential = await insert({
        url, 
        username, 
        password: encryptedPassword, 
        title, 
        userId
    });
    return credential;
}

async function retrieveCredential(userId: number, id: number) {
    const credential = await retrieve(id);
    if(!credential) {
        throw new CustomError(404, 'This id is not registered!');
    }
    if(credential.userId !== userId) {
        throw new CustomError(401, 'Unauthorized operation!');
    }
    return {...credential, password: secretKey.decrypt(credential.password)};
}

async function retrieveCredentials(userId: number) {
    const credentials = await retrieveMany(userId);
    return credentials.map(credential => {
        return {...credential, password: secretKey.decrypt(credential.password)};
    });
}

async function removeCredential(userId: number, id: number) {
    await retrieveCredential(userId, id);
    const credential = await remove(id);
    return credential;
}

const credentialServices = {
    insertCredential,
    retrieveCredential,
    removeCredential,
    retrieveCredentials
};

export default credentialServices;