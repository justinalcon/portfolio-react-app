import alt from '../alt';

import axios from 'axios';
import {endpoint_url} from '../utils';
import UserStore from '../stores/UserStore';

const DEFAULT_OFFSET = 9;
const DEFAULT_LIMIT = 3;

class PostsActions {
  constructor() {
    this.prevent_more_posts = false;
    
    // a comma delimited list of tags to filer by
    // default of empty string returns all tags
    this.load_more_tags = "";

    // the # to start loading more at
    // increments after successful loadMorePosts() 
    this.load_more_offset = 9;

    // the # of posts to load
    this.load_more_limit = 3;
    
  }

  // Pass in a post_data obj. Action is handled by PostsStore and assigns to selected_post
  updateSelectedPost(post){
    return post
  }

  // Get scroll position of index page infinite scroll grid save into PostsStore
  holdScrollForSelectedPost(){
    return document.getElementsByClassName("infinite-scroll")[0].scrollTop
  }

  // Send a signal to the store to clear all post entries
  emptyPosts(){
    return false
  }

  // Reset all variables and do a new ajax call
  loadPostsDefault() {

    // reset counters
    this.load_more_tags = "";
    this.load_more_offset = 0;
    this.load_more_limit = 9;

    // dispatch to store to reset all posts
    this.emptyPosts();

    // call load more with params from above
    this.loadMorePosts.defer();

    return true;
  }

  // Pass in an comma delimited list of tags and setup new ajax call
  loadPostsWithTags(tags_active_string){
    
    // reset counters
    this.load_more_tags = tags_active_string;
    this.load_more_offset = 0;
    this.load_more_limit = 9;

    // dispatch to store to reset all posts
    this.emptyPosts();

    // call load more with params from above
    this.loadMorePosts.defer();

    return true;
  }

  // Based on variables for tags/start/limit, set up an ajax call to get more posts
  // We dispatch once onstart, call the success||fail function, which will dispatch with the returned data.
  // Possible Alt supported rewrite: http://alt.js.org/docs/async/
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
      axios.get(`${endpoint_url}/sparks.json?tags=${this.load_more_tags}&start=${this.load_more_offset}&limit=${this.load_more_limit}&token=${UserStore.getState().auth_token}`)
        .then(function(posts){
          // success
          if(this.load_more_limit == DEFAULT_LIMIT){
            // increment counter
            this.load_more_offset += this.load_more_limit;
          } else {
            // subsequent 'infinite-load' calls should only load 3
            this.load_more_limit = DEFAULT_LIMIT;
            this.load_more_offset = DEFAULT_OFFSET;
          }
          this.loadMorePostsSuccess.defer(posts)
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