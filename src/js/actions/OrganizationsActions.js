import alt from '../alt';

import axios from 'axios';
import {ENDPOINT_URL} from '../utils';
import UserStore from '../stores/UserStore';

const DEFAULT_OFFSET = 9;
const DEFAULT_LIMIT = 3;

class OrganizationsActions {
  constructor() {
    this.prevent_more_organizations = false;

    // a comma delimited list of tags to filer by
    // default of empty string returns all tags
    this.load_more_tags = "";

    this.load_more_offset = 9;

    this.load_more_limit = 3;

  }

  updateSelectedOrganizations(org){
    return org
  }

  holdScrollForSelectedOrganizations(){
    return document.getElementsByClassName("infinite-scroll")[0].scrollTop
  }
  emptyOrganizations(){
    return false
  }

  // Reset all variables and do a new ajax call
  loadOrganizationsDefault() {

    // reset counters
    this.load_more_tags = "";
    this.load_more_offset = 0;
    this.load_more_limit = 9;

    this.emptyOrganizations();

    this.loadMoreOrganizations.defer();

    return true;
  }

  // We dispatch once onstart, call the success||fail function, which will dispatch with the returned data.
  // Possible Alt supported rewrite: http://alt.js.org/docs/async/
  loadMoreOrganizations() {

    if(this.prevent_more_organizations){
      console.log("OrganizationsActions.prevent_more_organizations returned true. skipping subsequent dispatches");
      return undefined;
    }

    return (dispatch) => {

      // dispatch event for initial "loading" state
      dispatch();
      this.prevent_more_organizations = true;

      // ajax for endpoints. call succuess/fail fn based on promise
      axios.get(`${ENDPOINT_URL}/organizations.json?start=${this.load_more_offset}&limit=${this.load_more_limit}&token=${UserStore.getState().auth_token}`)
        .then(function(organizations){
          // success
          if(this.load_more_limit == DEFAULT_LIMIT){
            // increment counter
            this.load_more_offset += this.load_more_limit;
          } else {
            // subsequent 'infinite-load' calls should only load 3
            this.load_more_limit = DEFAULT_LIMIT;
            this.load_more_offset = DEFAULT_OFFSET;
          }
          this.loadMoreOrganizationsSuccess.defer(organizations)
        }.bind(this))
        .catch(function(err_msg){
          // fail
          this.loadMoreOrganizationsFail.defer(err_msg)
        }.bind(this))
    }
  };

  loadMoreOrganizationsSuccess(organizations){
    this.prevent_more_organizations = false;
    return organizations
  }

  loadMoreOrganizationsFail(err_msg){
    this.prevent_more_organizations = false;
    return err_msg
  }



}

module.exports = alt.createActions(OrganizationsActions);
