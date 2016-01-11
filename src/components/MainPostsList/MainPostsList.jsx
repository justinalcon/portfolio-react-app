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
    
    console.log(PostsStore.getState());

    let cards = this.state.posts_data.map((post) => {
      return (
        <SparkCard key={post.id} spark_data={post} />
      );
    });

    return (
      <div>
        <h2>Main Post List</h2>
        {cards}
      </div>
    )
  }

}