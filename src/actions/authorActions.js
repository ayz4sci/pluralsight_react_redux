import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export const loadAuthorSuccess = (authors) => ({
    type: types.LOAD_AUTHORS_SUCCESS, authors
});

export const createAuthorSuccess = (author) => 
    ({ type: types.CREATE_AUTHOR_SUCCESS, author});

export const updateAuthorSuccess = (author) => 
    ({ type: types.UPDATE_AUTHORS_SUCCESS, author});

export const deleteAuthorSuccess = (author) => 
    ({ type: types.DELETE_AUTHOR_SUCCESS, author});

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

 export const saveAuthor = (author) => (
     dispatch => {
         dispatch(beginAjaxCall());
         return authorApi.saveAuthor(author).then(author => {
             author.id ? dispatch(updateAuthorSuccess(author)) 
                 : dispatch(createAuthorSuccess(author));
         }).catch(error => {
             dispatch(ajaxCallError(error));
             throw(error);
         });
     }
 );
 
 export const deleteAuthor = (author) => (
     dispatch => {
         dispatch(beginAjaxCall());
         return authorApi.deleteAuthor(author.id).then(
              dispatch(deleteAuthorSuccess(author))
         ).catch(error => {
             dispatch(ajaxCallError(error));
             throw(error);
         });
     }
 );