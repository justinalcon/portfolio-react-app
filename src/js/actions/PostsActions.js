import alt from '../alt';

import PostsStore from '../stores/PostsStore';

import axios from 'axios';
import {endpoint_url} from '../utils';

class PostsActions {
  constructor() {
    this.prevent_more_posts = false;
  }

  // Pass in a post_data obj. Action is handled by PostsStore and assigns to selected_post
  updateSelectedPost(post){
    return post
  }

  holdScrollForSelectedPost(){
    return document.getElementsByClassName("infinite-scroll")[0].scrollTop
  }
  

  // 2 step Async Actions 
  // Using defer so success/fail action waits for store to finish dispatch
  // Could be improved using this example: http://alt.js.org/docs/async/
  loadMorePosts() {
  
    if(this.prevent_more_posts){
      console.log("PostsActions.prevent_more_posts returned true. skipping subsequent dispatches");
      return undefined;
    }

    return (dispatch) => {

      // dispatch event for initial "loading" state
      dispatch();
      this.prevent_more_posts = true;

      // ajax for endpoints. call succuess/fail fn based on promise
      axios.get(endpoint_url+'/sparks.json')
        .then(function(posts){
          this.loadMorePostsSuccess.defer(posts)
        }.bind(this))
        .catch(function(err_msg){
          this.loadMorePostsFail.defer(err_msg)
        }.bind(this))
    }
  };

  loadMorePostsSuccess(posts){
    this.prevent_more_posts = false;
    return posts
  }

  loadMorePostsFail(err_msg){
    this.prevent_more_posts = false;
    return err_msg
  }



}

module.exports = alt.createActions(PostsActions);