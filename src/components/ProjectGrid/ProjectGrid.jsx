import React from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import connectToStores from 'alt-utils/lib/connectToStores';
import ProjectsStore from '../../js/stores/ProjectsStore';
import HeaderActions from '../../js/actions/HeaderActions';

import SparkCard from '../SparkCard/SparkCard';

class ProjectGrid extends React.Component {
  constructor() {
    super();
  }

  state = {
    projects_data : ProjectsStore.getState().current_projects
  };

  static getStores(props) {
    return [ProjectsStore]
  };
  static getPropsFromStores(props) {
    return ProjectsStore.getState()
  };

  componentDidMount() {
    // On home view, reset Header to default state
    HeaderActions.updateHeaderTitle("");
  }

  render() {

    let cards;

    if(this.props.current_projects.length > 0){
      cards = this.props.current_projects.map((project) => {
        return (
          <div className="grid__item css-js--fade-in css-js--fade-in-instant" key={project.id}>
            <SparkCard spark_data={project} />
          </div>
        );
      });
    } else {

      // Loading indicator?
      cards = "";
    }


    return (
      <div className="grid">
        <ReactCSSTransitionGroup transitionName="css-js--anim" transitionEnterTimeout={1000} transitionLeave={false}>
          {cards}
        </ReactCSSTransitionGroup>
      </div>
    )
  }

}

export default ProjectGrid = connectToStores(ProjectGrid);
