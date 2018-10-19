import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm'

class ManageCoursePage extends React.Component{
    state = {
        course: Object.assign({}, this.props.course),
        errors: {}
    }

    componentWillReceiveProps = (nextProps) => {
        if(this.props.course.id !== nextProps.course.id){
            this.setState({ course: Object.assign({}, nextProps.course) });
        }
    }

    updateCourseState = (event) => {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course: course});
    };

    saveCourse = (event) => {
        event.preventDefault();
        this.props.actions.saveCourse(this.state.course);
        this.context.router.push('/courses');
    }
    
    render(){
        return (
            <CourseForm
                allAuthors = {this.props.authors}
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                course={this.state.course}
                errors={this.state.errors} />
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
}

ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

let emptyCourse= {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

const getCourseById =(courses, courseId) => {
    if(courseId){
        let result = courses.filter( course => course.id === courseId);
        if(result[0]) return result[0];
    }

    return emptyCourse;
}

function mapStateToProps(state, ownProps){
    let courseId = ownProps.params.id;
    let course= getCourseById(state.courses, courseId);

    const authorsFormattedForDropDown = state.authors.map( author => {
        return {
            value: author.id,
            text: `${author.firstName} ${author.lastName}`
        }
    })
    return {
        course: course,
        authors: authorsFormattedForDropDown
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(courseActions, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);