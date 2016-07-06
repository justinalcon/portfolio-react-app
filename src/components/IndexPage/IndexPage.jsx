import React from 'react';

import InfiniteScrollContain from '../InfiniteScrollContain/InfiniteScrollContain';
import PostGrid from '../PostGrid/PostGrid';

import TechnologiesActions from '../../js/actions/TechnologiesActions';

export default class IndexPage extends React.Component {
  constructor() {
    super();
  }

  handleLoadMore(){
    TechnologiesActions.loadMoreTechnologies();
  };

  render() {
    return (
      <div className="index-page css-js--fade-in">
        <InfiniteScrollContain fnLoadMore={this.handleLoadMore}>
          <PostGrid/>
        </InfiniteScrollContain>
      </div>
    )
  }

}
