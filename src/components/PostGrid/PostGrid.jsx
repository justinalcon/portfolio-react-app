import React from 'react';

import PostsStore from '../../js/stores/PostsStore';
import HeaderActions from '../../js/actions/HeaderActions';

import SparkCard from '../SparkCard/SparkCard';

export default class PostGrid extends React.Component {
  constructor() {
    super();
  }

  state = {
    posts_data : PostsStore.getState().current_posts
  };

  componentDidMount() {
    // On home view, reset Header to default state
    HeaderActions.updateHeaderTitle("");
  }

  render() {

    let cards;

    if(this.state.posts_data.length > 0){
      cards = this.state.posts_data.map((post) => {
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
      <div className="post-grid css-js--fade-in">
        {cards}
      </div>
    )
  }

}