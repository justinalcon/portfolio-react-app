import React from 'react';

import connectToStores from 'alt-utils/lib/connectToStores';
import TechnologiesStore from '../../js/stores/TechnologiesStore';
import HeaderActions from '../../js/actions/HeaderActions';
import {slugify} from '../../js/utils';

// Model Spec
import {PropConfirm} from '../../js/specs';

import InfiniteScrollContain from '../InfiniteScrollContain/InfiniteScrollContain';
import TechGrid from '../TechGrid/TechGrid';
import SpecialtyGrid from '../SpecialtyGrid/SpecialtyGrid'
import OrganizationGrid from '../OrganizationGrid/OrganizationGrid'
import ExpertiseGrid from '../ExpertiseGrid/ExpertiseGrid'
import ProjectGrid from '../ProjectGrid/ProjectGrid'

import TechnologiesActions from '../../js/actions/TechnologiesActions';
import SpecialtiesActions from '../../js/actions/SpecialtiesActions';
import OrganizationsActions from '../../js/actions/OrganizationsActions';
import ExpertiseActions from '../../js/actions/ExpertiseActions';
import ProjectsActions from '../../js/actions/ProjectsActions';

class TechDetailView extends React.Component {
  constructor(props) {
    super(props);

    this.technology = props.selected_post

  }

  // Connects TechnologiesStore.state into this.props. Using connectToStores alt util.
  static getStores(props) {
    return [TechnologiesStore]
  };
  static getPropsFromStores(props) {
    return TechnologiesStore.getState()
  };

  // Validate props
  static propTypes = {
    selected_post: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired
    })
  };

  // On mount, update the Header to have our title
  componentDidMount() {
    HeaderActions.updateHeaderTitle(this.props.selected_post.title);
  }

  render() {
    return (
      <div className="index-page css-js--fade-in">
        <InfiniteScrollContain fnLoadMore={this.handleLoadMore}>
          <div className="section-divider">Technologies</div>
          <hr></hr>
          <TechGrid current_technologies={this.technology}/>
          <div className="section-divider">Specialties</div>
          <hr></hr>
          <SpecialtyGrid/>
          <div className="section-divider">Organizations</div>
          <hr></hr>
          <OrganizationGrid/>
          <div className="section-divider">Expertise</div>
          <hr></hr>
          <ExpertiseGrid/>
          <div className="section-divider">Projects</div>
          <hr></hr>
          <ProjectGrid/>
        </InfiniteScrollContain>
      </div>
    )
  }

}

export default TechDetailView = connectToStores(TechDetailView);
