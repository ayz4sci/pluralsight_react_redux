import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import AuthorForm from './AuthorForm';

const setup = (saving) => {
    const props = {
        author: {}, saving: saving, errors: {},
        onSave: () => {},
        onChange: () => {},
    }

    return shallow(<AuthorForm {...props} />);
}

describe ( 'Test AuthorForm via Enzyme', () => {
    it('renders form and h1', () => {
        const wrapper = setup(false);
        expect(wrapper.find('form').length).toBe(1);
        expect(wrapper.find('h1').text()).toEqual('Manage Author');
    });

    it('save button labeled "save" when not saving', () => {
        const wrapper = setup(false);
        expect(wrapper.find('input').props().value).toBe('Save');
    });

    it('save button labeled "saving" when  saving', () => {
        const wrapper = setup(true);
        expect(wrapper.find('input').props().value).toBe('Saving...');
    });
});