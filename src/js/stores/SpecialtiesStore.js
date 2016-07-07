import alt from '../alt';
import SpecialtiesActions from '../actions/SpecialtiesActions';
import QueryActions from '../actions/QueryActions';

class SpecialtiesStore {
  constructor() {

    this.current_specialties = [];

    // Boolean state value to show if loading or not.
    this.is_loading_more_specialties = false;

    this.selected_specialties = {};
    this.selected_specialties_scroll_pos = 0;

    // Catch actions, and run functions to update store
    this.bindListeners({
      handleHoldScrollForSelectedSpecialties: SpecialtiesActions.holdScrollForSelectedSpecialties,
      handleEmptySpecialties: SpecialtiesActions.emptySpecialties,
      handleLoadMoreSpecialties: SpecialtiesActions.loadMoreSpecialties,
      handleLoadMoreSpecialtiesSuccess: SpecialtiesActions.loadMoreSpecialtiesSuccess,
      handleLoadMoreSpecialtiesFail: SpecialtiesActions.loadMoreSpecialtiesFail,
      handleQuerySearch: QueryActions.querySearch,
      handleQueryByTags: QueryActions.queryByTags
    });

  }

  handleUpdateSelectedSpecialties(spec) {
    this.selected_specialties = spec;
  }

  handleHoldScrollForSelectedSpecialties(scroll_amt) {
    this.selected_specialties_scroll_pos = scroll_amt;
  }

  handleLoadMoreSpecialties(){
    this.setState({
      is_loading_more_specialties: true
    })
  }

  handleEmptySpecialties(){
    this.setState({
      current_specialties: []
    });
  }

  handleLoadMoreSpecialtiesSuccess(specialties){
    let appended_specialties = this.current_specialties;

    specialties.data.forEach(function(spec){
      appended_specialties.push(spec);
    });

    this.setState({
      current_specialties: appended_specialties,
      is_loading_more_specialties: false
    });
  }

  handleLoadMoreSpecialtiesFail(err_msg){
    this.setState({
      is_loading_more_specialties: false
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

module.exports = alt.createStore(SpecialtiesStore, 'SpecialtiesStore');
