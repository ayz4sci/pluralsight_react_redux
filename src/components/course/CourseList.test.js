import React from 'react';
import renderer from 'react-test-renderer';
import CourseList from './CourseList';

describe ('CourseList Test', () => {
    it('renders correctly using snapshot', () => {
        const props = {
            courses: [{id: 'A', watchHref: 'B', title: 'C', authorId: 'D', length: 'E', category: 'F'}],
            deleteCourse: () => Promise.resolve() 
        };
        const tree = renderer.create(<CourseList {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
});