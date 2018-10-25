import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import * as courseActions from '../../actions/courseActions';
import {authorsFormattedForDropDown} from '../../selectors/selectors';
import CourseForm from './CourseForm'
import toastr from 'toastr';

export class ManageCoursePage extends React.Component{
    state = {
        course: Object.assign({}, this.props.course),
        errors: {},
        saving: false,
        unsaved: false,
    }

    componentDidMount() {
        if(this.props.router){
            this.props.router.setRouteLeaveHook(this.props.route, () => {
            if (this.state.unsaved)
                return 'You have unsaved course, are you sure you want to leave this page?'
            })
        }
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
        return this.setState({
            course: course,
            unsaved: true
        });
    };

    courseFormIsValid =() => {
        let formIsValid = true;
        let errors = {};

        if(this.state.course.title.length < 5){
            errors.title = 'Title must be at least 5 characters.';
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    saveCourse = (event) => {
        event.preventDefault();

        if(!this.courseFormIsValid()) return;

        this.setState({
            saving: true,
            unsaved: false
        });

        this.props.actions.saveCourse(this.state.course)
            .then( () => this.redirect() )
            .catch( error => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }
    
    redirect = () =>{
        this.setState({saving: false});
        toastr.success("Course saved!");
        this.context.router.push('/courses');
    }

    render(){
        return (
            <CourseForm
                allAuthors = {this.props.authors}
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                course={this.state.course}
                errors={this.state.errors} 
                saving={this.state.saving} />
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

    return {
        course: course,
        authors: authorsFormattedForDropDown(state.authors)
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(courseActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageCoursePage));