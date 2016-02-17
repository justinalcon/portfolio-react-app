import alt from '../alt';
import TagActions from '../actions/TagActions';

class TagStore {
  constructor() {

    // An array of all tag objects
    this.tags_all = [];
    
    // Once the server-side data is passed into the store, add a state boolean to each.
    this.on('bootstrap', () => {
      this.tags_all.forEach(function(tag){
        tag.state = false;
      });
    });

    // Catch actions, and run functions to update store
    this.bindListeners({
      handleToggleTag: TagActions.toggleTag,
      handleResetAllTags: TagActions.resetAllTags
    });

  }

  // Find tab object with tag_name, and toggle state boolean
  handleToggleTag(tag_name){
    for (var i = 0; i < this.tags_all.length; i++) {
      if(this.tags_all[i].tag == tag_name){
        this.tags_all[i].state = !this.tags_all[i].state;
        break;
      } 
    }
  }

  // Set all tags to false
  handleResetAllTags(){
    this.tags_all.forEach(function(tag_obj){
      tag_obj.state = false;
    });
  }

}

module.exports = alt.createStore(TagStore, 'TagStore');