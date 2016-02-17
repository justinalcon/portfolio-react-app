import alt from '../alt';
import PostsActions from '../actions/PostsActions';
import QueryActions from '../actions/QueryActions';

import axios from 'axios';
import {endpoint_url} from '../utils';

class PostsStore {
  constructor() {

    // All of the posts in view
    this.current_posts = [];

    // A single selected post
    this.selected_post = {};

    // An array of all tags
    this.tags_all = [];

    // Catch actions, and run functions to update store
    this.bindListeners({
      handleUpdateSelectedPost: PostsActions.updateSelectedPost,
      handleLoadMorePosts: PostsActions.loadMorePosts,
      handleQuerySearch: QueryActions.querySearch,
      handleQueryByTags: QueryActions.queryByTags
    });

  }

  // Assign the selected post as the passed in post
  handleUpdateSelectedPost(post) {
    this.selected_post = post;
  }

  //
  handleLoadMorePosts(how_many) {
    let selected_post = this.selected_post;
    

    axios.get(endpoint_url+'/sparks.json')
      .then(function(response){
        
        let appended_posts = this.current_posts;
        response.data.forEach(function(post){
          
          /* TEMP WORKAROUND TO TEST PULLING IN MORE DATA */
          post.id = Math.floor(Math.random()*100);
          /* ---------------- */

          appended_posts.push(post);
        });
        this.setState({current_posts: appended_posts});

      }.bind(this))
      .catch(function(response){
        console.error("Error loading more posts", response);
      });
  };

  //
  handleQuerySearch(search_term) {
    console.log(`TODO: submit search for "${search_term}"`);
  }

  //
  handleQueryByTags(tags_array) {
   console.log("TODO: submit query with tags",tags_array); 
  }

}

module.exports = alt.createStore(PostsStore, 'PostsStore');