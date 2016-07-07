import alt from '../alt';
import ProjectsActions from '../actions/ProjectsActions';
import QueryActions from '../actions/QueryActions';

class ProjectsStore {
  constructor() {

    this.current_projects = [];

    // Boolean state value to show if loading or not.
    this.is_loading_more_projects = false;

    this.selected_project = {};
    this.selected_project_scroll_pos = 0;

    // Catch actions, and run functions to update store
    this.bindListeners({
      handleHoldScrollForSelectedProjects: ProjectsActions.holdScrollForSelectedProjects,
      handleEmptyProjects: ProjectsActions.emptyProjects,
      handleLoadMoreProjects: ProjectsActions.loadMoreProjects,
      handleLoadMoreProjectsSuccess: ProjectsActions.loadMoreProjectsSuccess,
      handleLoadMoreProjectsFail: ProjectsActions.loadMoreProjectsFail,
      handleQuerySearch: QueryActions.querySearch,
      handleQueryByTags: QueryActions.queryByTags
    });

  }

  handleUpdateSelectedProject(project) {
    this.selected_project = project;
  }

  handleHoldScrollForSelectedProjects(scroll_amt) {
    this.selected_project_scroll_pos = scroll_amt;
  }

  handleLoadMoreProjects(){
    this.setState({
      is_loading_more_projects: true
    })
  }

  handleEmptyProjects(){
    this.setState({
      current_projects: []
    });
  }

  handleLoadMoreProjectsSuccess(projects){
    let appended_Projects = this.current_projects;

    projects.data.forEach(function(project){
      appended_projects.push(project);
    });

    this.setState({
      current_Projects: appended_projects,
      is_loading_more_projects: false
    });
  }

  handleLoadMoreProjectsFail(err_msg){
    this.setState({
      is_loading_more_projects: false
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

module.exports = alt.createStore(ProjectsStore, 'ProjectsStore');
