import { STATUS_CODES } from 'http';

class CustomError extends Error {
    public statusPhrase: string;

    constructor(public statusCode: number, message: string) {
        super(message);
        const phrase = STATUS_CODES[statusCode];
        if (phrase) {
            this.statusPhrase = phrase;
        } else {
            throw new Error('Undefined Status Code');
        }
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

const errorUtils = {
    CustomError,
};

export default errorUtils;
