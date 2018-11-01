import React from 'react';
import renderer from 'react-test-renderer';
import AboutPage from './AboutPage';

describe ('About Page Test', () => {
    it('renders correctly using snapshot', () => {
        const tree = renderer.create(<AboutPage />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});