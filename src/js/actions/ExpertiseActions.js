import alt from '../alt';

import axios from 'axios';
import {ENDPOINT_URL} from '../utils';
import UserStore from '../stores/UserStore';

const DEFAULT_OFFSET = 9;
const DEFAULT_LIMIT = 3;

class ExpertiseActions {
  constructor() {
    this.prevent_more_expertise = false;

    this.load_more_tags = "";

    this.load_more_offset = 9;

    this.load_more_limit = 3;

  }

  updateSelectedExpertise(expertise){
    return expertise
  }

  holdScrollForSelectedExpertise(){
    return document.getElementsByClassName("infinite-scroll")[0].scrollTop
  }
  emptyExpertise(){
    return false
  }

  loadExpertiseDefault() {

    // reset counters
    this.load_more_tags = "";
    this.load_more_offset = 0;
    this.load_more_limit = 9;

    this.emptyExpertise();

    this.loadMoreExpertise.defer();

    return true;
  }

  // We dispatch once onstart, call the success||fail function, which will dispatch with the returned data.
  // Possible Alt supported rewrite: http://alt.js.org/docs/async/
  loadMoreExpertise() {

    if(this.prevent_more_expertise){
      console.log("expertiseActions.prevent_more_expertises returned true. skipping subsequent dispatches");
      return undefined;
    }

    return (dispatch) => {

      // dispatch event for initial "loading" state
      dispatch();
      this.prevent_more_expertise = true;

      // ajax for endpoints. call succuess/fail fn based on promise
      axios.get(`${ENDPOINT_URL}/expertise.json?start=${this.load_more_offset}&limit=${this.load_more_limit}&token=${UserStore.getState().auth_token}`)
        .then(function(expertise){
          // success
          if(this.load_more_limit == DEFAULT_LIMIT){
            // increment counter
            this.load_more_offset += this.load_more_limit;
          } else {
            // subsequent 'infinite-load' calls should only load 3
            this.load_more_limit = DEFAULT_LIMIT;
            this.load_more_offset = DEFAULT_OFFSET;
          }
          this.loadMoreExpertiseSuccess.defer(expertise)
        }.bind(this))
        .catch(function(err_msg){
          // fail
          this.loadMoreExpertisesFail.defer(err_msg)
        }.bind(this))
    }
  };

  loadMoreExpertiseSuccess(expertise){
    this.prevent_more_expertise = false;
    return expertises
  }

  loadMoreExpertiseFail(err_msg){
    this.prevent_more_expertise = false;
    return err_msg
  }



}

module.exports = alt.createActions(ExpertiseActions);
