import expect from 'expect';
import {authorsFormattedForDropDown} from './selectors';

describe('authorsFormatedForDropDown', () => {
    it('should return formatted data for use in a dropDown ', () => {
        const authors = [
            { id: 'cory-house', firstName: 'Cory', lastName: 'House'},
            { id: 'cory-house', firstName: 'Scott', lastName: 'Rose'},
        ];
        const expected = [
            { value: 'cory-house', text: 'Cory House'},
            { value: 'cory-house', text: 'Scott Rose'},
        ];
        expect(authorsFormattedForDropDown(authors)).toEqual(expected);
    });
});