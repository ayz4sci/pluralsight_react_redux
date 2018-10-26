import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

class App extends React.Component{
    render(){
        return (
            <div className="container-fluid container" >
                <Header 
                    loading={this.props.loading} 
                    courses={this.props.courses}
                    authors={this.props.authors} />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    loading: state.ajaxCallsInProgress > 0,
    courses: state.courses,
    authors: state.authors,
});

export default connect(mapStateToProps)(App);