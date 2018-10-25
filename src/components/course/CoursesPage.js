import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions'
import CourseList from './CourseList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class CoursesPage extends React.Component {

    redirectToAddCoursePage = () => {
        browserHistory.push('/course');
    }

    deleteCourse = (course) => {
        this.props.actions.deleteCourse(course)
            .catch( error => {
                toastr.error(error);
            });
    }

    render() {
        const {courses} = this.props;
        
        return (
            <div>
                <h1>Courses</h1>
                <input type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCoursePage} />
                <br/> 
                <br/> 
                { !courses || courses.length > 0 ?
                    <CourseList 
                        courses={courses}
                        deleteCourse={this.deleteCourse} />
                    :
                    <div>
                        <hr/> 
                        <h3>Empty course list! Add one above.</h3>
                    </div>
                }
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    courses: state.courses
});

const mapDispatchToProps = (dispatch)=>({
    actions: bindActionCreators( courseActions, dispatch )
})

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);