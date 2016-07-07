import alt from '../alt';
import OrganizationsActions from '../actions/OrganizationsActions';
import QueryActions from '../actions/QueryActions';

class OrganizationsStore {
  constructor() {

    this.current_organizations = [];

    // Boolean state value to show if loading or not.
    this.is_loading_more_organizations = false;

    this.selected_organizations = {};
    this.selected_organizations_scroll_pos = 0;

    // Catch actions, and run functions to update store
    this.bindListeners({
      handleHoldScrollForSelectedOrganizations: OrganizationsActions.holdScrollForSelectedOrganizations,
      handleEmptyOrganizations: OrganizationsActions.emptyOrganizations,
      handleLoadMoreOrganizations: OrganizationsActions.loadMoreOrganizations,
      handleLoadMoreOrganizationsSuccess: OrganizationsActions.loadMoreOrganizationsSuccess,
      handleLoadMoreOrganizationsFail: OrganizationsActions.loadMoreOrganizationsFail,
      handleQuerySearch: QueryActions.querySearch,
      handleQueryByTags: QueryActions.queryByTags
    });

  }

  handleUpdateSelectedOrganizations(org) {
    this.selected_organization = org;
  }

  handleHoldScrollForSelectedOrganizations(scroll_amt) {
    this.selected_organizations_scroll_pos = scroll_amt;
  }

  handleLoadMoreOrganizations(){
    this.setState({
      is_loading_more_organizations: true
    })
  }

  handleEmptyOrganizations(){
    this.setState({
      current_organizations: []
    });
  }

  handleLoadMoreOrganizationsSuccess(organizations){
    let appended_organizations = this.current_organizations;

    organizations.data.forEach(function(org){
      appended_organizations.push(org);
    });

    this.setState({
      current_organizations: appended_organizations,
      is_loading_more_organizations: false
    });
  }

  handleLoadMoreOrganizationsFail(err_msg){
    this.setState({
      is_loading_more_organizations: false
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

module.exports = alt.createStore(OrganizationsStore, 'OrganizationsStore');
