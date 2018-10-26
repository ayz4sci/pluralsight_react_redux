import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const AuthorListRow = ({author, deleteAuthor}) => {
    return (
        <tr>
            <td><Link to={'/author/' + author.id}>{author.firstName}</Link></td>
            <td><Link to={'/author/' + author.id}>{author.lastName}</Link></td>
            <td>{author.authorId}</td>
            <td>{author.category}</td>
            <td>
                <input type="submit"
                    value="Delete"
                    className="btn btn-danger btn-sm"
                    onClick={ () => deleteAuthor(author) } />
            </td>
        </tr>
    );
};

AuthorListRow.propTypes = {
    author: PropTypes.object.isRequired,
    deleteAuthor: PropTypes.func.isRequired
};

export default AuthorListRow;