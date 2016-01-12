import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import PostsStore from '../../js/stores/PostsStore';

class SparkDetailView extends React.Component {
  constructor() {
    super();
  }

  static getStores(props) {
    return [PostsStore]
  };
  static getPropsFromStores(props) {
    return PostsStore.getState()
  };

  static propTypes = {
    selected_post: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired
    })
  };

  render() {
    return (
      <div>
        SparkDetailView - {this.props.selected_post.title}
      </div>
    )
  }

}

export default SparkDetailView = connectToStores(SparkDetailView);