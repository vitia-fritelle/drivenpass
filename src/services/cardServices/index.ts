import repositories from '../../repositories';
import utils from '../../utils';

const { 
    insert, 
    retrieve, 
    retrieveMany, 
    remove 
} = repositories.cardRepository;
const {CustomError} = utils.errorUtils;
const {secretKey} = utils.cryptoUtils;

async function insertCard(
    number: string, 
    cardholderName: string, 
    securityCode: string, 
    expirationDate: Date, 
    password: string, 
    isVirtual: boolean, 
    type: 'debit' | 'credit' | 'both', 
    title: string,
    userId: number
) {
    const card = await insert({
        number, 
        cardholderName, 
        securityCode, 
        expirationDate: String(expirationDate), 
        password: secretKey.encrypt(password), 
        isVirtual, 
        type, 
        title,
        userId
    });
    return card;
}

async function retrieveCard(userId: number, id: number) {
    const card = await retrieve(id);
    if(!card) {
        throw new CustomError(404, 'This id is not registered!');
    }
    if(card.userId !== userId) {
        throw new CustomError(401, 'Unauthorized operation!');
    }
    return card;
}

async function retrieveCards(userId: number) {
    const cards = await retrieveMany(userId);
    return cards;
}

async function removeCard(userId: number, id: number) {
    await retrieveCard(userId, id);
    const card = await remove(id);
    return card;
}

const cardServices = {
    insertCard,
    retrieveCard,
    removeCard,
    retrieveCards
};

export default cardServices;