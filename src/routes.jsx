import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.jsx';
import {Router, Route, Link, IndexLink, IndexRoute} from 'react-router';

import PostGrid from './components/PostGrid/PostGrid';
import SearchPage from './components/SearchPage/SearchPage';
import FilterPage from './components/FilterPage/FilterPage';
import SparkDetailView from './components/SparkDetailView/SparkDetailView';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostGrid} />
    <Route path="search" component={SearchPage} />
    <Route path="filter" component={FilterPage} />
    <Route path="spark/:id(/:carousel_index)" component={SparkDetailView} />    
  </Route>
);