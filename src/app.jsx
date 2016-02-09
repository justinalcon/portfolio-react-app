import React from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from './components/Header/Header';

// Main React UI Element
export default class App extends React.Component {
  render() {
    return (
      <div>
        
        {/* Static. E.g. may be replaced with a <Header /> Component */}
        <Header/>       
        
        {/* 
          Dynamic content
           - Router decides correct Route to render, and passes the component into this.props.children
           - We're wrapping those children in a TransitionGroup to add in/out animation. A key is required in this case.
         */}
        <div id="router-content">
          <ReactCSSTransitionGroup transitionName="css-js--anim" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
            {
              React.cloneElement(this.props.children, {
                key: this.props.location.pathname
              })
            }
          </ReactCSSTransitionGroup>
        {/*this.props.children*/}
        </div>

      </div>
    )
  }
}