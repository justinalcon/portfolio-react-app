import alt from '../alt';

import TagStore from '../stores/TagStore';

class QueryActions {
  constructor() {}

  querySearch(search_term){
    return search_term
  }

  queryByTags(){

    let tags_active = [];
  
    TagStore.getState().tags_all.forEach(function(tag_obj){
      if(tag_obj.state){
        tags_active.push(tag_obj.id);
      }
    });

    return tags_active
  }
}

module.exports = alt.createActions(QueryActions);