import alt from '../alt';
import TechnologiesActions from '../actions/TechnologiesActions';
import QueryActions from '../actions/QueryActions';

class TechnologiesStore {
  constructor() {

    this.current_technologies = [];

    // Boolean state value to show if loading or not.
    this.is_loading_more_technologies = false;

    this.selected_technology = {};
    this.selected_technology_scroll_pos = 0;

    // Catch actions, and run functions to update store
    this.bindListeners({
      handleHoldScrollForSelectedTechnologies: TechnologiesActions.holdScrollForSelectedTechnologies,
      handleEmptyTechnologies: TechnologiesActions.emptyTechnologies,
      handleLoadMoreTechnologies: TechnologiesActions.loadMoreTechnologies,
      handleLoadMoreTechnologiesSuccess: TechnologiesActions.loadMoreTechnologiesSuccess,
      handleLoadMoreTechnologiesFail: TechnologiesActions.loadMoreTechnologiesFail,
      handleQuerySearch: QueryActions.querySearch,
      handleQueryByTags: QueryActions.queryByTags
    });

  }

  handleUpdateSelectedTechnology(tech) {
    this.selected_technology = tech;
  }

  handleHoldScrollForSelectedTechnologies(scroll_amt) {
    this.selected_technology_scroll_pos = scroll_amt;
  }

  handleLoadMoreTechnologies(){
    this.setState({
      is_loading_more_technologies: true
    })
  }

  handleEmptyTechnologies(){
    this.setState({
      current_technologies: []
    });
  }

  handleLoadMoreTechnologiesSuccess(technologies){
    let appended_technologies = this.current_technologies;

    technologies.data.forEach(function(technology){
      appended_technologies.push(technology);
    });

    this.setState({
      current_technologies: appended_technologies,
      is_loading_more_technologies: false
    });
  }

  handleLoadMoreTechnologiesFail(err_msg){
    this.setState({
      is_loading_more_technologies: false
    });
    console.error(err_msg.status, err_msg.statusText);
  }

  //
  handleQuerySearch(search_term) {
    console.log(`TODO: submit search for "${search_term}"`);
  }

  //
  handleQueryByTags(tags_array) {
   console.log("TODO: submit query with tags",tags_array);
  }

}

module.exports = alt.createStore(TechnologiesStore, 'TechnologiesStore');
