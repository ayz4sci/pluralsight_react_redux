import React, {PropTypes} from 'react';
import CourseListRow from './CourseListRow';

const CourseList = ({courses, sort, deleteCourse}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                     {/* eslint-disable-next-line */}
                    <th><a href="#" onClick={sort}>Title</a></th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Length</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                { courses.map(course => 
                    <CourseListRow 
                        key={course.id} 
                        course={course}
                        deleteCourse={deleteCourse} />
                )}
            </tbody>
        </table>
    );
};

CourseList.propTypes = {
    courses: PropTypes.array.isRequired,
    sort: PropTypes.func.isRequired
};

export default CourseList;