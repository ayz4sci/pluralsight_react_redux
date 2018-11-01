import React from 'react';
import renderer from 'react-test-renderer';
import HomePage from './HomePage';

describe ('HomePage Test', () => {
    it('renders correctly using snapshot', () => {
        const tree = renderer.create(<HomePage />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});