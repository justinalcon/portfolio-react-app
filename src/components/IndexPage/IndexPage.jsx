import React from 'react';
import PostGrid from '../PostGrid/PostGrid';

import PostsActions from '../../js/actions/PostsActions';

export default class IndexPage extends React.Component {
  constructor() {
    super();
  }

  handleLoadMore = () => {
    console.log("load more");
    PostsActions.loadMorePosts(false);
  };

  render() {
    return (
      <div className="index-page" onClick={this.handleLoadMore}>
        <PostGrid/>
      </div>
    )
  }

}