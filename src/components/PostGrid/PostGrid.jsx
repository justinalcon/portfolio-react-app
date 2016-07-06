import React from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import connectToStores from 'alt-utils/lib/connectToStores';
import TechnologiesStore from '../../js/stores/TechnologiesStore';
import HeaderActions from '../../js/actions/HeaderActions';

import SparkCard from '../SparkCard/SparkCard';

class PostGrid extends React.Component {
  constructor() {
    super();
  }

  state = {
    posts_data : TechnologiesStore.getState().current_technologies
  };

  // Connects TechnologiesStore.state into this.props. Using connectToStores alt util.
  static getStores(props) {
    return [TechnologiesStore]
  };
  static getPropsFromStores(props) {
    return TechnologiesStore.getState()
  };


  componentDidMount() {
    // On home view, reset Header to default state
    HeaderActions.updateHeaderTitle("");
  }

  render() {

    let cards;

    if(this.props.current_technologies.length > 0){
      cards = this.props.current_technologies.map((post) => {
        return (
          <div className="post-grid__item css-js--fade-in css-js--fade-in-instant" key={post.id}>
            <SparkCard spark_data={post} />
          </div>
        );
      });
    } else {

      // Loading indicator?
      cards = "";
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
