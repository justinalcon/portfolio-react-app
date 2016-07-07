import React from 'react';

import InfiniteScrollContain from '../InfiniteScrollContain/InfiniteScrollContain';
import TechGrid from '../TechGrid/TechGrid';
import SpecialtyGrid from '../SpecialtyGrid/SpecialtyGrid'
import OrganizationGrid from '../OrganizationGrid/OrganizationGrid'
import ExpertiseGrid from '../ExpertiseGrid/ExpertiseGrid'

import TechnologiesActions from '../../js/actions/TechnologiesActions';
import SpecialtiesActions from '../../js/actions/SpecialtiesActions';
import OrganizationsActions from '../../js/actions/OrganizationsActions';
import ExpertiseActions from '../../js/actions/ExpertiseActions';

export default class IndexPage extends React.Component {
  constructor() {
    super();
  }

  handleLoadMore(){
    TechnologiesActions.loadMoreTechnologies();
    SpecialtiesActions.loadMoreSpecialties();
  };

  render() {
    return (
      <div className="index-page css-js--fade-in">
        <InfiniteScrollContain fnLoadMore={this.handleLoadMore}>
          <div className="section-divider">Technologies</div>
          <hr></hr>
          <TechGrid/>
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

        </InfiniteScrollContain>
      </div>
    )
  }

}
