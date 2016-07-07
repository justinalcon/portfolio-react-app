import React from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import connectToStores from 'alt-utils/lib/connectToStores';
import ExpertiseStore from '../../js/stores/ExpertiseStore';
import HeaderActions from '../../js/actions/HeaderActions';

import SparkCard from '../SparkCard/SparkCard';

class ExpertiseGrid extends React.Component {
  constructor() {
    super();
  }

  state = {
    expertise_data : ExpertiseStore.getState().current_expertise
  };

  static getStores(props) {
    return [ExpertiseStore]
  };
  static getPropsFromStores(props) {
    return ExpertiseStore.getState()
  };


  componentDidMount() {
    // On home view, reset Header to default state
    HeaderActions.updateHeaderTitle("");
  }

  render() {

    let cards;

    if(this.props.current_expertise.length > 0){
      cards = this.props.current_expertise.map((expertise) => {
        return (
          <div className="grid__item css-js--fade-in css-js--fade-in-instant" key={expertise.id}>
            <SparkCard spark_data={expertise} />
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

export default ExpertiseGrid = connectToStores(ExpertiseGrid);
