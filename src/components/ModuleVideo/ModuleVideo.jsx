import React from 'react';

export default class ModuleVideo extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    canned_video: React.PropTypes.string
  };

  render() {
    return (
      <div className="module-video">
        <video className="module-video__vid" src={this.props.canned_video} autoload="false" preload="false" controls />
      </div>
    )
  }

}