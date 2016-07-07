import alt from '../alt';

import axios from 'axios';
import {ENDPOINT_URL} from '../utils';
import UserStore from '../stores/UserStore';

const DEFAULT_OFFSET = 9;
const DEFAULT_LIMIT = 3;

class SpecialtiesActions {
  constructor() {
    this.prevent_more_specialties = false;

    // a comma delimited list of tags to filer by
    // default of empty string returns all tags
    this.load_more_tags = "";

    this.load_more_offset = 9;

    this.load_more_limit = 3;

  }

  updateSelectedSpecialties(spec){
    return spec
  }

  holdScrollForSelectedSpecialties(){
    return document.getElementsByClassName("infinite-scroll")[0].scrollTop
  }
  emptySpecialties(){
    return false
  }

  // Reset all variables and do a new ajax call
  loadSpecialtiesDefault() {

    // reset counters
    this.load_more_tags = "";
    this.load_more_offset = 0;
    this.load_more_limit = 9;

    this.emptySpecialties();

    this.loadMoreSpecialties.defer();

    return true;
  }

  // We dispatch once onstart, call the success||fail function, which will dispatch with the returned data.
  // Possible Alt supported rewrite: http://alt.js.org/docs/async/
  loadMoreSpecialties() {

    if(this.prevent_more_specialties){
      console.log("SpecialtiesActions.prevent_more_specialties returned true. skipping subsequent dispatches");
      return undefined;
    }

    return (dispatch) => {

      // dispatch event for initial "loading" state
      dispatch();
      this.prevent_more_specialties = true;

      // ajax for endpoints. call succuess/fail fn based on promise
      axios.get(`${ENDPOINT_URL}/specialties.json?start=${this.load_more_offset}&limit=${this.load_more_limit}&token=${UserStore.getState().auth_token}`)
        .then(function(specialties){
          // success
          if(this.load_more_limit == DEFAULT_LIMIT){
            // increment counter
            this.load_more_offset += this.load_more_limit;
          } else {
            // subsequent 'infinite-load' calls should only load 3
            this.load_more_limit = DEFAULT_LIMIT;
            this.load_more_offset = DEFAULT_OFFSET;
          }
          this.loadMoreSpecialtiesSuccess.defer(specialties)
        }.bind(this))
        .catch(function(err_msg){
          // fail
          this.loadMoreSpecialtiesFail.defer(err_msg)
        }.bind(this))
    }
  };

  loadMoreSpecialtiesSuccess(specialties){
    this.prevent_more_specialties = false;
    return specialties
  }

  loadMoreSpecialtiesFail(err_msg){
    this.prevent_more_specialties = false;
    return err_msg
  }



}

module.exports = alt.createActions(SpecialtiesActions);
