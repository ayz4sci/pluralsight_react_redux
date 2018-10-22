import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';
import {beginAjaxCall} from './ajaxStatusActions';

export const loadAuthorSuccess = (authors) => ({
    type: types.LOAD_AUTHORS_SUCCESS, authors
});

export const loadAuthors = () => ( 
    dispatch => {
        dispatch(beginAjaxCall());
        authorApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorSuccess(authors));
        }).catch(error => {
            throw(error);
        });
    }
 );