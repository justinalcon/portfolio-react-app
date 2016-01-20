import React from 'react';

export default class FeaturedCarousel extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    tab_index: React.PropTypes.number.isRequired,
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ])
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
      <div className="feat-carousel feat-carousel--100p-height" data-length={this.props.children.length} data-carousel-index={this.props.tab_index}>
        <div className="feat-carousel__scale">
          <div className="feat-carousel__translate">
            <div className="feat-carousel__wide-contain">
              {slides}
            </div>
          </div>
        </div>
      </div>
    )
  }

}