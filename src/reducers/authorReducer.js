import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorReducer (state = initialState.authors, action){
    let result = [];
    switch (action.type) {
        case types.LOAD_AUTHORS_SUCCESS:
            result = action.authors;
            break;

        case types.CREATE_AUTHOR_SUCCESS:
            result= [
                ...state,
                Object.assign({}, action.author)
            ];
            break;

        case types.UPDATE_AUTHORS_SUCCESS:
            result =  [
                ...state.filter(author => author.id !== action.author.id),
                Object.assign({}, action.author)
            ];
            break;

        case types.DELETE_AUTHOR_SUCCESS:
            result =  [
                ...state.filter(author => author.id !== action.author.id)
            ];
            break;

        default:
            result =  state;
    }
    return sort(result);
}

const sort = (authors) => {
    authors.sort((a, b) =>{
        const x = a.firstName.toLowerCase();
        const y = b.firstName.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    });
    return authors;
}
