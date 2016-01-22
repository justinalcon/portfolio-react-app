import React from 'react';

import Header from './components/Header/Header';

// Main React UI Element
export default class App extends React.Component {
  render() {
    return (
      <div>
        
        {/* Static. E.g. may be replaced with a <Header /> Component */}
        <Header/>       
        
        {/* Dynamic content decided by the Router */}
        <div id="router-content">
          {this.props.children}
        </div>

      </div>
    )
  }
}