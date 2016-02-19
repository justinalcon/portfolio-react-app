import React from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import connectToStores from 'alt-utils/lib/connectToStores';
import PostsStore from '../../js/stores/PostsStore';
import HeaderActions from '../../js/actions/HeaderActions';

import SparkCard from '../SparkCard/SparkCard';

class PostGrid extends React.Component {
  constructor() {
    super();
  }

  state = {
    posts_data : PostsStore.getState().current_posts
  };

  // Connects PostsStore.state into this.props. Using connectToStores alt util.
  static getStores(props) {
    return [PostsStore]
  };
  static getPropsFromStores(props) {
    return PostsStore.getState()
  };


  componentDidMount() {
    // On home view, reset Header to default state
    HeaderActions.updateHeaderTitle("");
  }

  render() {

    let cards;

    if(this.props.current_posts.length > 0){
      cards = this.props.current_posts.map((post) => {
        return (
          <div className="post-grid__item css-js--fade-in css-js--fade-in-instant" key={post.id}>
            <SparkCard spark_data={post} />
          </div>
        );
      });
    } else {

      // Loading indicator?
      cards = ""; //<p>Discovery content will show here. Working on that now...</p>;
    }
    

    return (
      <div className="post-grid">
        <ReactCSSTransitionGroup transitionName="css-js--anim" transitionEnterTimeout={1000} transitionLeave={false}>
          {cards}
        </ReactCSSTransitionGroup>
      </div>
    )
  }

}

export default PostGrid = connectToStores(PostGrid);