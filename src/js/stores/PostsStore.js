import alt from '../alt';
import PostsActions from '../actions/PostsActions';
import QueryActions from '../actions/QueryActions';

class PostsStore {
  constructor() {

    // All of the posts in view
    this.current_posts = [];

    // A single selected post
    this.selected_post = {};

    // Catch actions, and run functions to update store
    this.bindListeners({
      handleUpdateSelectedPost : PostsActions.updateSelectedPost,
      handleQuerySearch: QueryActions.querySearch
    });

  }

  // Assign the selected post as the passed in post
  handleUpdateSelectedPost(post) {
    this.selected_post = post;
  }

  handleQuerySearch(search_term) {
    window.alert(`TODO: search for "${search_term}"`);
  }

}

module.exports = alt.createStore(PostsStore, 'PostsStore');