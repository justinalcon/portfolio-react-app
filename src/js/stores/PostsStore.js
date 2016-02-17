import alt from '../alt';
import PostsActions from '../actions/PostsActions';
import QueryActions from '../actions/QueryActions';

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
      handleQuerySearch: QueryActions.querySearch,
      handleQueryByTags: QueryActions.queryByTags
    });

  }

  // Assign the selected post as the passed in post
  handleUpdateSelectedPost(post) {
    this.selected_post = post;
  }

  handleQuerySearch(search_term) {
    console.log(`TODO: submit search for "${search_term}"`);
  }

  handleQueryByTags(tags_array) {
   console.log("TODO: submit query with tags",tags_array); 
  }

}

module.exports = alt.createStore(PostsStore, 'PostsStore');