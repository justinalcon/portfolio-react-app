import alt from '../alt';

import PostsStore from '../stores/PostsStore';

import axios from 'axios';
import {endpoint_url} from '../utils';


const LOAD_MORE_LIMIT = 3;

class PostsActions {
  constructor() {
    this.prevent_more_posts = false;
    
    // the # to start loading more at
    // increments after successful loadMorePosts() 
    this.load_more_offset = 9;
    
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
      axios.get(`${endpoint_url}/sparks.json?start=${this.load_more_offset}&limit=${LOAD_MORE_LIMIT}`)
        .then(function(posts){
          // success
          this.loadMorePostsSuccess.defer(posts)
          this.load_more_offset += LOAD_MORE_LIMIT;
        }.bind(this))
        .catch(function(err_msg){
          // fail
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