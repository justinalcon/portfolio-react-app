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
        
        <span className="header__logo"><IndexLink to="/">{title}</IndexLink></span>

        <nav className="header__nav">
          <button><Link to="/filter">Filter</Link></button>
          <button><Link to="/search">Search</Link></button>
        </nav>

      </header>
    )
  }

}

export default Header = connectToStores(Header);