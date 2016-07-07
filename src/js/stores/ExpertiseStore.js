import alt from '../alt';
import ExpertiseActions from '../actions/ExpertiseActions';
import QueryActions from '../actions/QueryActions';

class ExpertiseStore {
  constructor() {

    this.current_expertise = [];

    // Boolean state value to show if loading or not.
    this.is_loading_more_expertise = false;

    this.selected_expertise = {};
    this.selected_expertise_scroll_pos = 0;

    // Catch actions, and run functions to update store
    this.bindListeners({
      handleHoldScrollForSelectedExpertise: ExpertiseActions.holdScrollForSelectedExpertise,
      handleEmptyExpertise: ExpertiseActions.emptyExpertise,
      handleLoadMoreExpertise: ExpertiseActions.loadMoreExpertise,
      handleLoadMoreExpertiseSuccess: ExpertiseActions.loadMoreExpertiseSuccess,
      handleQuerySearch: QueryActions.querySearch,
      handleQueryByTags: QueryActions.queryByTags
    });

  }

  handleUpdateSelectedExpertise(expertise) {
    this.selected_expertise = expertise;
  }

  handleHoldScrollForSelectedExpertise(scroll_amt) {
    this.selected_expertise_scroll_pos = scroll_amt;
  }

  handleLoadMoreExpertise(){
    this.setState({
      is_loading_more_expertise: true
    })
  }

  handleEmptyExpertise(){
    this.setState({
      current_expertise: []
    });
  }

  handleLoadMoreExpertiseSuccess(expertise){
    let appended_expertise = this.current_expertise;

    expertise.data.forEach(function(org){
      appended_expertise.push(org);
    });

    this.setState({
      current_expertise: appended_expertise,
      is_loading_more_expertise: false
    });
  }

  handleLoadMoreExpertiseFail(err_msg){
    this.setState({
      is_loading_more_expertise: false
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

module.exports = alt.createStore(ExpertiseStore, 'ExpertiseStore');
