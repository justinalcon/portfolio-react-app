import alt from '../alt';

class QueryActions {
  constructor() {}

  querySearch(search_term){
    return search_term
  }

  queryTags(tags_array){
    return tags_array
  }
}

module.exports = alt.createActions(QueryActions);