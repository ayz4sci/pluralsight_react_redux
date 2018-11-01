import React from 'react';
import renderer from 'react-test-renderer';
import PageNotFound from './PageNotFound';

describe ('PageNotFound Test', () => {
    it('renders correctly using snapshot', () => {
        const tree = renderer.create(<PageNotFound />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});