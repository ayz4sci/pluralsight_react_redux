import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer (state = initialState.courses, action){
    let result = [];
    switch (action.type) {
        case types.LOAD_COURSES_SUCCESS:
            result = action.courses;
            break;

        case types.CREATE_COURSE_SUCCESS:
            result= [
                ...state,
                Object.assign({}, action.course)
            ];
            break;

        case types.UPDATE_COURSES_SUCCESS:
            result =  [
                ...state.filter(course => course.id !== action.course.id),
                Object.assign({}, action.course)
            ];
            break;

        case types.DELETE_COURSE_SUCCESS:
            result =  [
                ...state.filter(course => course.id !== action.course.id)
            ];
            break;

        default:
            result =  state;
    }
    return sort(result);
}

const sort = (courses) => {
    courses.sort((a, b) =>{
        const x = a.title.toLowerCase();
        const y = b.title.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    });
    return courses;
}
