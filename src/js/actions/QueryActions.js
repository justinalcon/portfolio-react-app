import alt from '../alt';

import TagStore from '../stores/TagStore';

class QueryActions {
  constructor() {}

  querySearch(search_term){
    return search_term
  }

  queryByTags(){

    let tags_active = [];
    let tags_all = TagStore.getState().tags_all
  
    for (var tag in tags_all) {
      if (tags_all.hasOwnProperty(tag)) {
        if(tags_all[tag] == true){
          tags_active.push(tag);
        }
      }
    }

    return tags_active
  }
}

module.exports = alt.createActions(QueryActions);