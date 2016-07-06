import React from 'react';

// Stores
import connectToStores from 'alt-utils/lib/connectToStores';
import TechnologiesStore from '../../js/stores/TechnologiesStore';

// Utils
import {detectIsNode, throttle} from '../../js/utils';

class InfiniteScrollContain extends React.Component {
  constructor() {
    super();

    this.state = {
      previous_scroll_pos: 0
    }
  }

  static defaultProps = {
    selected_post_scroll_pos: 0
  };

  static propTypes = {
    fnLoadMore: React.PropTypes.func.isRequired,
    selected_post_scroll_pos: React.PropTypes.number
  };  

  // Connects TechnologiesStore.state into this.props. Using connectToStores alt util.
  static getStores(props) {
    return [TechnologiesStore]
  };
  static getPropsFromStores(props) {
    var post_state =  TechnologiesStore.getState();
    return {
      selected_post_scroll_pos: post_state.selected_post_scroll_pos
    }
  };
  
  componentDidMount() {    
    // save sizes for perf
    this.initializeScrollVariables();

    // if on client
    if(!detectIsNode()){

      // add scroll event handler
      this.refs.infinite_scroll.addEventListener("scroll", throttle(this.handleScroll, 100));

      // jump to previous known position
      this.jumpScrollTo(this.props.selected_post_scroll_pos);
    }
  }

  componentWillUnmount() {
    // rm event handler to rm memory leak
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

  // Scroll logic to detect bottom of .infinite-scroll
  handleScroll = () => {

    let scroll_height = this.refs.infinite_scroll.children[0].scrollHeight;
    let dist_from_bottom = this.refs.infinite_scroll.scrollTop - this.offset_top + this.window_height;
    
    if(scroll_height - dist_from_bottom < 400){
      this.props.fnLoadMore();
    }
  };

  jumpScrollTo = (scroll_top) => {
    this.refs.infinite_scroll.scrollTop = scroll_top;
  };

  render() {
    return (
      <div className="infinite-scroll" ref="infinite_scroll">
        {this.props.children}
      </div>
    )
  }

}

export default InfiniteScrollContain = connectToStores(InfiniteScrollContain);