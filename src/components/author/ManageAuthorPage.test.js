import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {ManageAuthorPage} from './ManageAuthorPage';

describe ('Manage Author Page', () => {
    it('sets error message when trying to save empty firstName', () => {
        const props = {
            authors: [],
            actions: { saveAuthor: () => (Promise.resolve())},
            author: {id: '', firstName: '', lastname: ''}
        };
        const wrapper = mount(<ManageAuthorPage {...props} />);
        const saveButton = wrapper.find('input').last();
        expect(saveButton.prop('type')).toBe('submit');
        saveButton.simulate('click');
        expect(wrapper.state().errors.firstName).toEqual('Field cannot be empty.');
    });

    it('sets error message when trying to save empty lastName', () => {
        const props = {
            authors: [],
            actions: { saveAuthor: () => (Promise.resolve())},
            author: {id: 'lol', firstName: 'Lol', lastName: ''}
        };
        const wrapper = mount(<ManageAuthorPage {...props} />);
        const saveButton = wrapper.find('input').last();
        expect(saveButton.prop('type')).toBe('submit');

        saveButton.simulate('click');
        expect(wrapper.state().errors.lastName).toEqual('Field cannot be empty.');
    });
});