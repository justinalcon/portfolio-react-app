import alt from '../alt';

class PostsActions {
  constructor() {}

  // Pass in a post_data obj. Action is handled by PostsStore and assigns to selected_post
  updateSelectedPost(post){
    return post
  }

}

module.exports = alt.createActions(PostsActions);