import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

 export const loadCoursesSuccess = (course) => 
    ({ type: types.LOAD_COURSES_SUCCESS, course});

export const loadCourses = () => (
    dispatch => ( courseApi.getAllCourses().then(courses => { 
        dispatch(loadCoursesSuccess(courses)) 
    }).catch(error => {
        throw(error);
    }))
);