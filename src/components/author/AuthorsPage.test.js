import React from 'react';
import expect from 'expect';
import {shallow} from 'enzyme';
import {AuthorsPage} from './AuthorsPage';

describe ('Manage Author Page', () => {
    it('shows empty list when authors are empty', () => {
        const props = {
            authors: [],
            courses: [],
            actions: { deleteAuthor: () => Promise.resolve() }
        };

        const wrapper = shallow(<AuthorsPage {...props} />);

        expect(wrapper.find('h3').text()).toEqual('Empty author list! Add one above.');
    });
});