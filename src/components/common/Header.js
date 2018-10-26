import React from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots'

const Header = ({loading, courses, authors}) => {
    return (
        <nav className="mb-3">
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
            {" | "}
            <Link to="/courses" activeClassName="active">Courses ({courses ? courses.length: 0})</Link>
            {" | "}
            <Link to="/authors" activeClassName="active">Authors ({authors ? authors.length: 0})</Link>
            {" | "}
            <Link to="/about" activeClassName="active">About</Link>
            { loading && <LoadingDots interval={100} dots={20} /> }
        </nav>
    );
};

export default Header;