import expect from 'expect';
import authorReducer, {sort} from './authorReducer';
import * as actions from '../actions/authorActions';

describe( 'Author Reducer', () => {
    it('should add author when passed CREATE_AUTHOR_SUCCESS', () => {
        const initialState = [
            { firstName: 'A'},
            { firstName: 'B'},
        ];

        const newAuthor = { firstName: 'C'};
        const action = actions.createAuthorSuccess(newAuthor);
        const newState = authorReducer(initialState, action);

        expect(newState.length).toBe(3);
        expect(newState[0].firstName).toEqual('A');
        expect(newState[1].firstName).toEqual('B');
        expect(newState[2].firstName).toEqual('C');
    });

    it('should update author when passed UPDATE_AUTHOR_SUCCESS', () => {
        const initialState = [
            { id: 'A', firstName: 'A'},
            { id: 'B', firstName: 'B'},
            { id: 'C', firstName: 'C'},
        ];

        const author = { id:'B', firstName: 'New Title'};
        const action = actions.updateAuthorSuccess(author);
        const newState = authorReducer(initialState, action);

        const updatedAuthor = newState.find( a => a.id === author.id);
        const untouchedAuthor = newState.find( a => a.id === 'A');

        expect(updatedAuthor.firstName).toEqual('New Title');
        expect(untouchedAuthor.firstName).toEqual('A');
        expect(newState.length).toBe(3);

    });

    it('should sort authors by firstName', () => {
        const authors = [
            { firstName: 'C'},
            { firstName: 'A'},
            { firstName: 'B'},
        ];

        sort(authors);

        expect(authors[0].firstName).toEqual('A');
        expect(authors[1].firstName).toEqual('B');
        expect(authors[2].firstName).toEqual('C');
    });
});