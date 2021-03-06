import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {ManageCoursePage} from './ManageCoursePage';

describe ('Manage Course Page', () => {
    it('sets error message when trying to save empty title', () => {
        const props = {
            authors: [],
            actions: { saveCourse: () => (Promise.resolve())},
            course: {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}
        };
        const wrapper = mount(<ManageCoursePage {...props} />);
        const saveButton = wrapper.find('input').last();
        expect(saveButton.prop('type')).toBe('submit');
        saveButton.simulate('click');
        expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
    });

    it('sets error message when trying to save empty category', () => {
        const props = {
            authors: [],
            actions: { saveCourse: () => (Promise.resolve())},
            course: {id: '', watchHref: '', title: '12345', authorId: '23', length: '23', category: ''}
        };
        const wrapper = mount(<ManageCoursePage {...props} />);
        const saveButton = wrapper.find('input').last();
        expect(saveButton.prop('type')).toBe('submit');
        saveButton.simulate('click');
        expect(wrapper.state().errors.category).toBe('Field cannot be empty.');
    });

    it('sets error message when trying to save empty length', () => {
        const props = {
            authors: [],
            actions: { saveCourse: () => (Promise.resolve())},
            course: {id: '', watchHref: '', title: '12345', authorId: '23', length: '', category: '234'}
        };
        const wrapper = mount(<ManageCoursePage {...props} />);
        const saveButton = wrapper.find('input').last();
        expect(saveButton.prop('type')).toBe('submit');
        saveButton.simulate('click');
        expect(wrapper.state().errors.length).toBe('Field cannot be empty.');
    });
});