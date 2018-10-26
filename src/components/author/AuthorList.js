import React, {PropTypes} from 'react';
import AuthorListRow from './AuthorListRow';

const AuthorList = ({authors, deleteAuthor}) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                { authors.map(author => 
                    <AuthorListRow 
                        key={author.id} 
                        author={author}
                        deleteAuthor={deleteAuthor} />
                )}
            </tbody>
        </table>
    );
};

AuthorList.propTypes = {
    authors: PropTypes.array.isRequired,
};

export default AuthorList;