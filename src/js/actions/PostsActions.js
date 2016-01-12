import alt from '../alt';

class PostsActions {
  constructor() {
    this.generateActions(
        'updateSelectedPost'
    );
  }
  // updateSelectedPost(post){
  //   return post
  // }
}

module.exports = alt.createActions(PostsActions);