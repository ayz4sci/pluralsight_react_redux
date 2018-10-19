import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';

export const loadAuthorSuccess = (authors) => ({
    type: types.LOAD_AUTHORS_SUCCESS, authors
});

export const loadAuthors = () => ( 
    dispatch => (authorApi.getAllAuthors().then(authors => {
        dispatch(loadAuthorSuccess(authors));
    }).catch(error => {
        throw(error);
    }))
 );