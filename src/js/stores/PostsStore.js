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
      handleQueryTags: QueryActions.queryTags
    });

  }

  // Assign the selected post as the passed in post
  handleUpdateSelectedPost(post) {
    this.selected_post = post;
  }

  handleQuerySearch(search_term) {
    window.alert(`TODO: submit search for "${search_term}"`);
  }

  handleQueryTags(tags_array) {
   window.alert(`TODO: submit query with "${tags_array}"`); 
  }

}

module.exports = alt.createStore(PostsStore, 'PostsStore');