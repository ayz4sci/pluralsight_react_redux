import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage';
import AuthorsPage from './components/author/AuthorsPage';
import ManageAuthorPage from './components/author/ManageAuthorPage';
import PageNotFound from './components/errorPage/PageNotFound';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="courses" component={CoursesPage} />
        <Route path="course/:id" component={ManageCoursePage} />
        <Route path="course" component={ManageCoursePage} />
        <Route path="authors" component={AuthorsPage} />
        <Route path="author/:id" component={ManageAuthorPage} />
        <Route path="author" component={ManageAuthorPage} />
        <Route path="about" component={AboutPage} />
        <Route path='*' exact={true} component={PageNotFound} />
    </Route>
);