import React from 'react';
import {Link, IndexLink} from 'react-router';

export default class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <header>
        
        <span className="header__logo"><IndexLink to="/">DISCOVERY</IndexLink></span>

        <nav className="header__nav">
          <button><Link to="/filter">Filter</Link></button>
          <button><Link to="/search">Search</Link></button>
        </nav>

      </header>
    )
  }

}