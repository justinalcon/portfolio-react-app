import alt from '../alt';
import PostsActions from '../actions/PostsActions';

class PostsStore {
  constructor() {
    this.current_posts = [];
    this.selected_post = {};

    this.bindListeners({
      handleUpdateSelectedPost : PostsActions.UPDATE_SELECTED_POST
    });

  }

  handleUpdateSelectedPost(post) {
    this.selected_post = post;
  }

}

module.exports = alt.createStore(PostsStore, 'PostsStore');