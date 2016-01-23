import alt from '../alt';

class TagActions {
  constructor() {}

  // Pass in a post_data obj. Action is handled by PostsStore and assigns to selected_post
  toggleTag(tag_name){
    return tag_name
  }

}

module.exports = alt.createActions(TagActions);