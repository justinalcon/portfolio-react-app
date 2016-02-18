import React from 'react';

import {detectIsNode, throttle} from '../../js/utils';

export default class InfiniteScrollContain extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    fnLoadMore: React.PropTypes.func.isRequired
  };  

  componentDidMount() {
    this.initializeScrollVariables();

    if(!detectIsNode()){
      this.refs.infinite_scroll.addEventListener("scroll", throttle(this.handleScroll, 100));
    }
  }

  componentWillUnmount() {
    if(!detectIsNode()){
      this.refs.infinite_scroll.removeEventListener("scroll", throttle(this.handleScroll, 100));
    }    
  }

  initializeScrollVariables(){
    // original distance div.infinite-scroll is from top of page
    this.offset_top = this.refs.infinite_scroll.getBoundingClientRect().top;

    // height of window in px;
    this.window_height = window.innerHeight;
  }

  handleScroll = () => {

    let scroll_height = this.refs.infinite_scroll.children[0].scrollHeight;
    let dist_from_bottom = this.refs.infinite_scroll.scrollTop - this.offset_top + this.window_height;
    
    if(scroll_height - dist_from_bottom < 400){
      this.props.fnLoadMore();
    }
  };

  render() {
    return (
      <div className="infinite-scroll" ref="infinite_scroll">
        {this.props.children}
      </div>
    )
  }

}