import React from 'react';

import connectToStores from 'alt-utils/lib/connectToStores';
import PostsStore from '../../js/stores/PostsStore';
import HeaderActions from '../../js/actions/HeaderActions';

import SparkCard from '../SparkCard/SparkCard';

class PostGrid extends React.Component {
  constructor() {
    super();
  }

  state = {
    posts_data : PostsStore.getState().current_posts
  };

  // Connects PostsStore.state into this.props. Using connectToStores alt util.
  static getStores(props) {
    return [PostsStore]
  };
  static getPropsFromStores(props) {
    return PostsStore.getState()
  };


  componentDidMount() {
    // On home view, reset Header to default state
    HeaderActions.updateHeaderTitle("");
  }

  render() {

    let cards;

    if(this.props.current_posts.length > 0){
      cards = this.props.current_posts.map((post) => {
        return (
          <div className="post-grid__item" key={post.id}>
            <SparkCard spark_data={post} />
          </div>
        );
      });
    } else {
      cards = <p>Discovery content will show here. Working on that now...</p>;
      console.error("posts_data returned empty;");
    }
    

    return (
      <div className="post-grid">
        {cards}
      </div>
    )
  }

}

export default PostGrid = connectToStores(PostGrid);