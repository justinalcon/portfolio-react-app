import alt from '../alt';

import axios from 'axios';
import {ENDPOINT_URL} from '../utils';
import UserStore from '../stores/UserStore';

const DEFAULT_OFFSET = 9;
const DEFAULT_LIMIT = 3;

class ProjectsActions {
  constructor() {
    this.prevent_more_projects = false;

    // a comma delimited list of tags to filer by
    // default of empty string returns all tags
    this.load_more_tags = "";

    this.load_more_offset = 9;

    this.load_more_limit = 3;

  }

  updateSelectedProject(project){
    return project
  }

  holdScrollForSelectedProjects(){
    return document.getElementsByClassName("infinite-scroll")[0].scrollTop
  }
  emptyProjects(){
    return false
  }

  // Reset all variables and do a new ajax call
  loadProjectsDefault() {

    // reset counters
    this.load_more_tags = "";
    this.load_more_offset = 0;
    this.load_more_limit = 9;

    this.emptyProjects();

    this.loadMoreProjects.defer();

    return true;
  }

  // Based on variables for tags/start/limit, set up an ajax call to get more posts
  // We dispatch once onstart, call the success||fail function, which will dispatch with the returned data.
  // Possible Alt supported rewrite: http://alt.js.org/docs/async/
  loadMoreProjects() {

    if(this.prevent_more_projects){
      console.log("ProjectsActions.prevent_more_Projects returned true. skipping subsequent dispatches");
      return undefined;
    }

    return (dispatch) => {

      // dispatch event for initial "loading" state
      dispatch();
      this.prevent_more_projects = true;

      // ajax for endpoints. call succuess/fail fn based on promise
      axios.get(`${ENDPOINT_URL}/projects.json?start=${this.load_more_offset}&limit=${this.load_more_limit}&token=${UserStore.getState().auth_token}`)
        .then(function(projects){
          // success
          if(this.load_more_limit == DEFAULT_LIMIT){
            // increment counter
            this.load_more_offset += this.load_more_limit;
          } else {
            // subsequent 'infinite-load' calls should only load 3
            this.load_more_limit = DEFAULT_LIMIT;
            this.load_more_offset = DEFAULT_OFFSET;
          }
          this.loadMoreProjectsSuccess.defer(projects)
        }.bind(this))
        .catch(function(err_msg){
          // fail
          this.loadMoreProjectsFail.defer(err_msg)
        }.bind(this))
    }
  };

  loadMoreProjectsSuccess(projects){
    this.prevent_more_projects = false;
    return projects
  }

  loadMoreProjectsFail(err_msg){
    this.prevent_more_projects = false;
    return err_msg
  }



}

module.exports = alt.createActions(ProjectsActions);
