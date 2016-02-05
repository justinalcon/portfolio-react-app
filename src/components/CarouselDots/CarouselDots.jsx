import React from 'react';

export default class CarouselDots extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    item_length: React.PropTypes.number,
    item_index: React.PropTypes.number
  };

  render() {
    
    let dots = [];
    for (var i = 0; i < this.props.item_length; i++) {
      dots.push(
        <div className="carousel-dots__dot" key={i}></div>
      );
    };

    return (
      <div className="carousel-dots" data-index={this.props.item_index}>
        <div className="carousel-dots__contain">
          {dots}
          <div className="carousel-dots__dot carousel-dots__dot--selector"></div>
        </div>
      </div>
    )
  }

}