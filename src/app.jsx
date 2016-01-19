import React from 'react';
import {Link, IndexLink} from 'react-router';

import Header from './components/Header/Header';


// Main React UI Element
export default class App extends React.Component {
  render() {
    return (
      <div>
        
        <Header />

        {/* Static. E.g. may be replaced with a <Header /> Component */}
        <nav>
          <button><IndexLink to="/">Home</IndexLink></button>
          <button><Link to="/filter">Filter</Link></button>
          <button><Link to="/search">Search</Link></button>
        </nav>
        
        {/* Dynamic content decided by the Router */}
        <div id="router-content">
          {this.props.children}
        </div>

      </div>
    )
  }
}