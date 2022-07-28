
import repositories from "../../repositories";
import utils from "../../utils";

const {insert, getUserByEmail} = repositories.userRepository;
const {CustomError} = utils.errorUtils;
const {hash, compare, sign, decode} = utils.cryptoUtils;

async function insertUser(email: string, password: string) {
    const user = await getUserByEmail(email);
    if (user) {
        throw new CustomError(409, "User already registered!");
    }
    const encryptedPassword = await hash(password, 10);
    await insert({email, password: encryptedPassword});
}

async function authenticateUser(email: string, password: string) {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new CustomError(401, "User not registered!");
    } 
    const samePassword = await compare(user.password, password);
    if (!samePassword) {
        throw new CustomError(401, "Wrong password!");
    }
    return sign(email);
}

async function getUserId(token: string) {
    const email = await decode(token);
    if(typeof email !== 'string') {
        throw new CustomError(422, 'Invalid token!');
    }
    const user = await getUserByEmail(email);
    if(!user) {
        throw new CustomError(422, 'Invalid token!');
    }
    return user.id;
}

const userServices = {
    insertUser,
    authenticateUser,
    getUserId
};
export default userServices;