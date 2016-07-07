import React from 'react';

import InfiniteScrollContain from '../InfiniteScrollContain/InfiniteScrollContain';
import TechGrid from '../TechGrid/TechGrid';
import SpecialtyGrid from '../SpecialtyGrid/SpecialtyGrid'

import TechnologiesActions from '../../js/actions/TechnologiesActions';
import SpecialtiesActions from '../../js/actions/SpecialtiesActions';

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
          <div className="section-divider">Technoliges</div>
          <TechGrid/>
          <div className="section-divider">Specialties</div>
          <SpecialtyGrid/>
        </InfiniteScrollContain>
      </div>
    )
  }

}
