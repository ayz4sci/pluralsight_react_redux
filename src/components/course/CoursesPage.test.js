import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import {CoursesPage} from './CoursesPage';

describe ('Manage Course Page', () => {
    it('shows empty list when courses are empty', () => {
        const props = {
            courses: [],
            actions: { deleteCourse: () => Promise.resolve() }
        };

        const wrapper = shallow(<CoursesPage {...props} />);

        expect(wrapper.find('h3').text()).toEqual('Empty course list! Add one above.');
    });
});