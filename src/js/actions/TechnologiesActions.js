import alt from '../alt';

import axios from 'axios';
import {ENDPOINT_URL} from '../utils';
import UserStore from '../stores/UserStore';

const DEFAULT_OFFSET = 9;
const DEFAULT_LIMIT = 3;

class TechnologiesActions {
  constructor() {
    this.prevent_more_technologies = false;

    // a comma delimited list of tags to filer by
    // default of empty string returns all tags
    this.load_more_tags = "";

    this.load_more_offset = 9;

    this.load_more_limit = 3;

  }

  updateSelectedTechnology(technology){
    return technology
  }

  holdScrollForSelectedTechnologies(){
    return document.getElementsByClassName("infinite-scroll")[0].scrollTop
  }
  emptyTechnologies(){
    return false
  }

  // Reset all variables and do a new ajax call
  loadTechnologiesDefault() {

    // reset counters
    this.load_more_tags = "";
    this.load_more_offset = 0;
    this.load_more_limit = 9;

    this.emptyTechnologies();

    this.loadMoreTechnologies.defer();

    return true;
  }

  // Based on variables for tags/start/limit, set up an ajax call to get more posts
  // We dispatch once onstart, call the success||fail function, which will dispatch with the returned data.
  // Possible Alt supported rewrite: http://alt.js.org/docs/async/
  loadMoreTechnologies() {

    if(this.prevent_more_technologies){
      console.log("TechnologiesActions.prevent_more_technologies returned true. skipping subsequent dispatches");
      return undefined;
    }

    return (dispatch) => {

      // dispatch event for initial "loading" state
      dispatch();
      this.prevent_more_technologies = true;

      // ajax for endpoints. call succuess/fail fn based on promise
      axios.get(`${ENDPOINT_URL}/technologies.json?start=${this.load_more_offset}&limit=${this.load_more_limit}&token=${UserStore.getState().auth_token}`)
        .then(function(technologies){
          // success
          if(this.load_more_limit == DEFAULT_LIMIT){
            // increment counter
            this.load_more_offset += this.load_more_limit;
          } else {
            // subsequent 'infinite-load' calls should only load 3
            this.load_more_limit = DEFAULT_LIMIT;
            this.load_more_offset = DEFAULT_OFFSET;
          }
          this.loadMoreTechnologiesSuccess.defer(technologies)
        }.bind(this))
        .catch(function(err_msg){
          // fail
          this.loadMoreTechnologiesFail.defer(err_msg)
        }.bind(this))
    }
  };

  loadMoreTechnologiesSuccess(technologies){
    this.prevent_more_technologies = false;
    return technologies
  }

  loadMoreTechnologiesFail(err_msg){
    this.prevent_more_technologies = false;
    return err_msg
  }



}

module.exports = alt.createActions(TechnologiesActions);
