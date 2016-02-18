import React from 'react';

import InfiniteScrollContain from '../InfiniteScrollContain/InfiniteScrollContain';
import PostGrid from '../PostGrid/PostGrid';

import PostsActions from '../../js/actions/PostsActions';

export default class IndexPage extends React.Component {
  constructor() {
    super();
  }

  handleLoadMore(){
    PostsActions.loadMorePosts();
  };

  render() {
    return (
      <div className="index-page css-js--fade-in" onClick={this.handleLoadMore}>
        <InfiniteScrollContain fnLoadMore={this.handleLoadMore}>
          <PostGrid/>
        </InfiniteScrollContain>
      </div>
    )
  }

}