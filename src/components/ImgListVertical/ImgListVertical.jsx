import React from 'react';

import CarouselDots from '../CarouselDots/CarouselDots';

import {detectIsTouch} from '../../js/utils';

export default class ImgListVertical extends React.Component {
  constructor() {
    super();

    this.state = {
      scroll_index: 0,
    }

    this.transition = {
      is_active: false,
      duration: 0.5
    }

    this.hammertime;
  }

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.element),
      React.PropTypes.element
    ])
  };

  componentDidMount() {
    
    if(detectIsTouch()){
      this.addHammerHandlers();
    } else {
      this.bindScroll();
    }
  }

  componentWillUnmount() {
    
    if(detectIsTouch()){
      this.hammertime.off('swipe');
      this.hammertime.destroy();
    } else {
      this.unbindScroll();
    }
  }

  bindScroll(){
    this.refs.list.addEventListener('wheel', this.handleScroll);
  }
  unbindScroll(){
    this.refs.list.removeEventListener('wheel', this.handleScroll);
  }

  handleScroll = (e) => {
    
    // check we're not mid scroll.
    // if delta passes threshold, check direction, and move slider
    if(!this.transition.is_active && Math.abs(e.deltaY) > 100){
      if(e.deltaY > 0) {
        this.forwardIndex();
      } else {
        this.backwardIndex();
      }
      
      // once activated, stop future calls until transition is complete
      this.transition.is_active = true;
      window.setTimeout(() => {
        this.transition.is_active = false;
      }, this.transition.duration*1000);
    }

  };

  addHammerHandlers() {
    
    // Add swipe/left detection to the refs="list" dom node
    let forwardIndex = this.forwardIndex;
    let backwardIndex = this.backwardIndex;
    let list = this.refs.list;

    this.hammertime = new Hammer.Manager(list, {
      recognizers: [
        [Hammer.Swipe, { direction: Hammer.DIRECTION_VERTICAL}]
      ]
    }).on('swipeup', function(ev){
      forwardIndex();
    }).on('swipedown', function(ev){
      backwardIndex();
    });
  }

  forwardIndex = () => {
    if(this.state.scroll_index < React.Children.count(this.props.children) - 1){
      this.setState({
        scroll_index: this.state.scroll_index + 1
      });  
    }
  };
  backwardIndex = () => {
    if(this.state.scroll_index > 0){
      this.setState({
        scroll_index: this.state.scroll_index - 1
      });  
    }
  };

  render() {

    let items = this.props.children.map(function(child,index){
      return (
        <div className="img-list-vert__item" key={index}>
          {child}
        </div>
      );
    })

    let list_style = {
      transform: `translateY(${-100 * this.state.scroll_index}%)`
    }

    return (
      <div className="img-list-vert" ref="list">
        <div className="img-list-vert__translate-y" style={list_style}>
          {items}
        </div>
        <CarouselDots item_index={this.state.scroll_index} item_length={React.Children.count(this.props.children)}/>
      </div>
    )
  }

}