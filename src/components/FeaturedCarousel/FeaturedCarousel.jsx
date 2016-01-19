import React from 'react';

export default class FeaturedCarousel extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    tab_index: React.PropTypes.number.isRequired
  };

  render() {

    // React.Children.forEach(function(child){
    //   console.log(child);
    //   // return child
    // });

    return (
      <div className="feat-carousel" data-length={this.props.children.length} data-carousel-index={this.props.tab_index}>
        <div className="feat-carousel__translate">
          <div className="feat-carousel__wide-contain">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }

}