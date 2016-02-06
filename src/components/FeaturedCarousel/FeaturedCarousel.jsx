import React from 'react';

import {detectIsTouch} from './../../js/utils';

export default class FeaturedCarousel extends React.Component {
  constructor() {
    super();

    this.hammertime;
  }

  static propTypes = {
    tab_index: React.PropTypes.number.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    cbSetTabState: React.PropTypes.func.isRequired
  };

  componentDidMount() {
    if(detectIsTouch()){
      this.addHammerSwipe();
    }
  }

  componentWillUnmount() {
   if(detectIsTouch()){
     this.removeHammerSwipe();
   } 
  }

  addHammerSwipe() {
    
    // Add swipe/left detection to the refs="carousel" dom node
    let carousel = this.refs.carousel;
    let forwardIndex = this.forwardIndex;
    let backwardIndex = this.backwardIndex;

    this.hammertime = new Hammer.Manager(carousel, {
      recognizers: [
        [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL}]
      ]
    }).on('swipeleft', function(ev){
      forwardIndex();
    }).on('swiperight', function(ev){
      backwardIndex();
    });
  }
  removeHammerSwipe() {
    this.hammertime.off('swipe');
    this.hammertime.destroy();
  }

  forwardIndex = () => {
    this.props.cbSetTabState(this.props.tab_index + 1);
  };

  backwardIndex = () => {
    this.props.cbSetTabState(this.props.tab_index - 1);
  };

  render() {

    let slides = React.Children.map(this.props.children, function(child){
      return (
        <div className="feat-carousel__slide">
          {child}
        </div>
      )
    });

    return (
      <div className="feat-carousel feat-carousel--100p-height" ref="carousel" data-length={this.props.children.length} data-carousel-index={this.props.tab_index}>
        <div className="feat-carousel__translate">
          <div className="feat-carousel__wide-contain">
            {slides}
          </div>
        </div>
      </div>
    )
  }

}