import repositories from '../../repositories';
import utils from '../../utils';

const { 
    insert, 
    retrieve, 
    retrieveMany, 
    remove 
} = repositories.noteRepository;
const {CustomError} = utils.errorUtils;

async function insertNote(title: string, content: string, userId: number) {
    const note = await insert({title, content, userId});
    return note;
}

async function retrieveNote(userId: number, id: number) {
    const note = await retrieve(id);
    if(!note) {
        throw new CustomError(404, 'This id is not registered!');
    }
    if(note.userId !== userId) {
        throw new CustomError(401, 'Unauthorized operation!');
    }
    return note;
}

async function retrieveNotes(userId: number) {
    const notes = await retrieveMany(userId);
    return notes;
}

async function removeNote(userId: number, id: number) {
    await retrieveNote(userId, id);
    const note = await remove(id);
    return note;
}

const noteServices = {
    insertNote,
    retrieveNote,
    removeNote,
    retrieveNotes
};

export default noteServices;