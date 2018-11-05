import React from 'react';
import renderer from 'react-test-renderer';
import AuthorList from './AuthorList';

describe ('AuthorList Test', () => {
    it('renders correctly using snapshot', () => {
        const props = {
            authors: [{id: 'A', firstName: 'B', lastName: 'C'}],
            deleteAuthor: () => Promise.resolve() 
        };
        const tree = renderer.create(<AuthorList {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});