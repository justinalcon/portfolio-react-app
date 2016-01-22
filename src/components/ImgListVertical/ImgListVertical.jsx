import React from 'react';

export default class ImgListVertical extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.element),
      React.PropTypes.element
    ])
  };

  render() {

    let items = this.props.children.map(function(child,index){
      return (
        <div className="img-list-vert__item" key={index}>
          {child}
        </div>
      );
    })

    return (
      <div className="img-list-vert">
        {items}
      </div>
    )
  }

}