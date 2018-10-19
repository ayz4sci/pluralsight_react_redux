import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions'
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

class CoursesPage extends React.Component {
    
    redirectToAddCoursePage = () => {
        browserHistory.push('/course');
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
                <CourseList courses={courses} />
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