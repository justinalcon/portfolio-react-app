import alt from '../alt';
import TagActions from '../actions/TagActions';

class TagStore {
  constructor() {

    // An object of all tags
    // name_of_tag: isSelected (boolean)
    this.tags_all = {};

    // Catch actions, and run functions to update store
    this.bindListeners({
      handleUpdateSelectedPost: TagActions.toggleTag
    });

  }

  // Assign the selected post as the passed in post
  handleUpdateSelectedPost(tag_name){
    this.tags_all[tag_name] = !this.tags_all[tag_name];
  }

}

module.exports = alt.createStore(TagStore, 'TagStore');