import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions'
import AuthorList from './AuthorList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class AuthorsPage extends React.Component {

    redirectToAddAuthorPage = () => {
        browserHistory.push('/author');
    }

    findCourseByAuthorId = (authorId) => {
        return this.props.courses.filter( course => course.authorId === authorId)
    }

    deleteAuthor = (author) => {
        const course = this.findCourseByAuthorId(author.id);
        if(course[0]) {
            toastr.error("Cannot delete an author that has a course.")
            return;
        }

        this.props.actions.deleteAuthor(author)
            .catch( error => {
                toastr.error(error);
            });
    }
 
    render() {
        const {authors} = this.props;
        
        return (
            <div>
                <h1>Authors</h1>
                <input type="submit"
                    value="Add Author"
                    className="btn btn-primary"
                    onClick={this.redirectToAddAuthorPage} />
                <br/> 
                <br/> 
                { !authors || authors.length > 0 ?
                    <AuthorList 
                        authors={authors}
                        deleteAuthor={this.deleteAuthor} />
                    :
                    <div>
                        <hr/> 
                        <h3>Empty author list! Add one above.</h3>
                    </div>
                }
            </div>
        );
    }
}

AuthorsPage.propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    authors: state.authors,
    courses: state.courses,
});

const mapDispatchToProps = (dispatch)=>({
    actions: bindActionCreators( authorActions, dispatch )
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);