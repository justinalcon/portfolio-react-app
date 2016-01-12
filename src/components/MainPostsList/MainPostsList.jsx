import React from 'react';

import PostsStore from '../../js/stores/PostsStore';

import SparkCard from '../Spark/SparkCard';

export default class MainPostsList extends React.Component {
  constructor() {
    super();
  }

  state = {
    posts_data : PostsStore.getState().current_posts
  };

  render() {

    let cards;

    if(this.state.posts_data.length > 0){
      cards = this.state.posts_data.map((post) => {
        return (
          <SparkCard key={post.id} spark_data={post} />
        );
      });
    } else {
      cards = <p>Discovery content will show here. Working on that now...</p>;
      console.error("MainPostList.state.posts_data returned empty.");
    }
    

    return (
      <div>
        <h2>Main Post List</h2>
        {cards}
      </div>
    )
  }

}