import React from 'react';

import InfiniteScrollContain from '../InfiniteScrollContain/InfiniteScrollContain';
import PostGrid from '../PostGrid/PostGrid';

import PostsActions from '../../js/actions/PostsActions';

export default class IndexPage extends React.Component {
  constructor() {
    super();
  }

  handleLoadMore = (callback) => {
    console.log("onClick fired");
    PostsActions.loadMorePosts();
  };

  loadedMoreCallback() {
    console.log("successly called back to load more");
  }

  render() {
    return (
      <div className="index-page" onClick={this.handleLoadMore}>
        <InfiniteScrollContain fnLoadMore={this.handleLoadMore}>
          <PostGrid/>
        </InfiniteScrollContain>
      </div>
    )
  }

}