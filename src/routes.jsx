import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.jsx';
import {Router, Route, Link, IndexLink, IndexRoute} from 'react-router';

import ListPage from './components/ListPage/ListPage';
import SearchPage from './components/SearchPage/SearchPage';
import FilterPage from './components/FilterPage/FilterPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ListPage} />
    <Route path="search" component={SearchPage} />
    <Route path="filter" component={FilterPage} />
  </Route>
);