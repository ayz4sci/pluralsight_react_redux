import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions'
import CourseList from './CourseList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class CoursesPage extends React.Component {
    
    listIncrementSize = 5;

    state = {
        listSize: 10
    }

    componentDidMount = () =>{
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
        if((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)
            && this.props.courses.length && this.state.listSize < this.props.courses.length){
                this.setState(prevState => ({
                    listSize: prevState.listSize + this.listIncrementSize
                }))
            }
    }

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
                        courses={courses.slice(0, this.state.listSize)}
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