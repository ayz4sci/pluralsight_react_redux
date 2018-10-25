import React, {PropTypes} from 'react';
import CourseListRow from './CourseListRow';

const CourseList = ({courses, deleteCourse}) => {

    const sort = (courses) => {
        courses.sort((a, b) =>{
            const x = a.title.toLowerCase();
            const y = b.title.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Length</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                { sort(courses)}
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
};

export default CourseList;