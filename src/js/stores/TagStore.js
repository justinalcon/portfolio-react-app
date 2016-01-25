import alt from '../alt';
import TagActions from '../actions/TagActions';

class TagStore {
  constructor() {

    // An object of all tags
    // name_of_tag: isSelected (boolean)
    this.tags_all = {};

    // Catch actions, and run functions to update store
    this.bindListeners({
      handleToggleTag: TagActions.toggleTag,
      handleResetAllTags: TagActions.resetAllTags
    });

  }

  // Assign the selected post as the passed in post
  handleToggleTag(tag_name){
    this.tags_all[tag_name] = !this.tags_all[tag_name];
  }

  handleResetAllTags(){
    for (var tag in this.tags_all) {
      if (this.tags_all.hasOwnProperty(tag)) {
        this.tags_all[tag] = false;
      }
    }
  }

}

module.exports = alt.createStore(TagStore, 'TagStore');