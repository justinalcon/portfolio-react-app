import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.jsx';
import {Router, Route, Link, IndexLink, IndexRoute} from 'react-router';

import IndexPage from './components/IndexPage/IndexPage';
import LoginPage from './components/LoginPage/LoginPage';
import SearchPage from './components/SearchPage/SearchPage';
import FilterPage from './components/FilterPage/FilterPage';
import SparkDetailView from './components/SparkDetailView/SparkDetailView';
import TechDetailView from './components/TechDetailView/TechDetailView';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={IndexPage} />
    <Route path="login" component={LoginPage} />
    <Route path="search" component={SearchPage} />
    <Route path="filter" component={FilterPage} />
    <Route path="spark/:id" component={SparkDetailView} />
    <Route path="tech/:id" component={TechDetailView} />
  </Route>
);
