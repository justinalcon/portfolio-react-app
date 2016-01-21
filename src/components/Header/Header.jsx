import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import HeaderStore from '../../js/stores/HeaderStore';


import {Link, IndexLink} from 'react-router';

class Header extends React.Component {
  constructor() {
    super();
  }

  // Get HeaderStore.state and pass into this.props
  static getStores(props) {
    return [HeaderStore]
  };
  static getPropsFromStores(props) {
    return HeaderStore.getState()
  };

  render() {

    let title  = this.props.header_title || "DISCOVERY";

    return (
      <header>
        
        <span className="header__logo font--headline"><IndexLink to="/">{title}</IndexLink></span>

        <nav className="header__nav">
          <Link className="btn-minimal" activeClassName="btn-minimal--active" to="/filter">
            <p className="btn-minimal__text">Filter</p>            
          </Link>
          <Link className="btn-minimal" activeClassName="btn-minimal--active" to="/search">Search</Link>
        </nav>

      </header>
    )
  }

}

export default Header = connectToStores(Header);

// <svg className="btn-minimal__icon" viewBox="0 0 50 50">
//     <path d="M 3.8125 2 A 1.0001 1.0001 0 0 0 3 3 L 3 6 A 1.0001 1.0001 0 0 0 3.28125 6.6875 L 19 23.375 L 19 41 A 1.0001 1.0001 0 0 0 19.5 41.84375 L 29.5 47.84375 A 1.0001 1.0001 0 0 0 31 47 L 31 23.375 L 46.5625 6.84375 A 1.0001 1.0001 0 0 0 46.59375 6.8125 L 46.71875 6.6875 A 1.0001 1.0001 0 0 0 46.84375 6.53125 A 1.0001 1.0001 0 0 0 46.90625 6.46875 A 1.0001 1.0001 0 0 0 47 6.0625 A 1.0001 1.0001 0 0 0 47 6 A 1.0001 1.0001 0 0 0 47 5.84375 L 47 3 A 1.0001 1.0001 0 0 0 46 2 L 4 2 A 1.0001 1.0001 0 0 0 3.90625 2 A 1.0001 1.0001 0 0 0 3.8125 2 z M 5 4 L 45 4 L 45 5.625 L 29.5625 22 L 20.4375 22 L 5 5.625 L 5 4 z M 21 24 L 29 24 L 29 45.25 L 21 40.46875 L 21 24 z" color="#000"></path>
// </svg>