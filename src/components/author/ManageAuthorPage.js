import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm'
import toastr from 'toastr';

export class ManageAuthorPage extends React.Component{
    state = {
        author: Object.assign({}, this.props.author),
        errors: {},
        saving: false,
        unsaved: false,
    }

    componentDidMount() {
        if(this.props.router){
            this.props.router.setRouteLeaveHook(this.props.route, () => {
            if (this.state.unsaved)
                return 'You have unsaved author, are you sure you want to leave this page?'
            })
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(this.props.author.id !== nextProps.author.id){
            this.setState({ author: Object.assign({}, nextProps.author) });
        }
    }

    updateAuthorState = (event) => {
        const field = event.target.name;
        let author = this.state.author;
        author[field] = event.target.value;
        return this.setState({
            author: author,
            unsaved: true
        });
    };

    authorFormIsValid =() => {
        let formIsValid = true;
        let errors = {};

        if(this.state.author.firstName.length < 1){
            errors.firstName = 'Field cannot be empty.';
            formIsValid = false;
        } else if(this.state.author.lastName.length < 1){
            errors.lastName = 'Field cannot be empty.';
            formIsValid = false;
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    saveAuthor = (event) => {
        event.preventDefault();

        if(!this.authorFormIsValid()) return;

        this.setState({
            saving: true,
            unsaved: false
        });

        this.props.actions.saveAuthor(this.state.author)
            .then( () => this.redirect() )
            .catch( error => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }
    
    redirect = () =>{
        this.setState({saving: false});
        toastr.success("Author saved!");
        this.context.router.push('/authors');
    }

    render(){
        return (
            <div>
                {this.props.invalidAuthorId && 
                    <div className="alert alert-warning" role="alert">Invalid Author ID</div>
                }

                <AuthorForm
                    onChange={this.updateAuthorState}
                    onSave={this.saveAuthor}
                    author={this.state.author}
                    errors={this.state.errors} 
                    saving={this.state.saving} />
            </div>
        );
    }
}

ManageAuthorPage.propTypes = {
    author: PropTypes.object.isRequired,
    invalidAuthorId: PropTypes.bool,
    actions: PropTypes.object.isRequired,
}

ManageAuthorPage.contextTypes = {
    router: PropTypes.object
};

let emptyAuthor= {id: '', firstName: '', lastName: ''};

const getAuthorById =(authors, authorId) => {
    if(authorId){
        let result = authors.filter( author => author.id === authorId);
        if(result[0]) {
            return result[0];
        }
    }

    return emptyAuthor;
}

function mapStateToProps(state, ownProps){
    let authorId = ownProps.params.id;
    let author= getAuthorById(state.authors, authorId);

    return {
        author: author,
        invalidAuthorId: ownProps.params.id && author.id === ""
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(authorActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageAuthorPage));