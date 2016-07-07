import React from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import connectToStores from 'alt-utils/lib/connectToStores';
import SpecialtiesStore from '../../js/stores/SpecialtiesStore';
import HeaderActions from '../../js/actions/HeaderActions';

import SparkCard from '../SparkCard/SparkCard';

class SpecialtyGrid extends React.Component {
  constructor() {
    super();
  }

  state = {
    specialites_data : SpecialtiesStore.getState().current_specialties
  };

  static getStores(props) {
    return [SpecialtiesStore]
  };
  static getPropsFromStores(props) {
    return SpecialtiesStore.getState()
  };


  componentDidMount() {
    // On home view, reset Header to default state
    HeaderActions.updateHeaderTitle("");
  }

  render() {

    let spec_cards;

    if(this.props.current_specialties.length > 0){
      spec_cards = this.props.current_specialties.map((spec) => {
        return (
          <div className="grid__item css-js--fade-in css-js--fade-in-instant" key={spec.id}>
            <SparkCard spark_data={spec} />
          </div>
        );
      });
    } else {

      // Loading indicator?
      spec_cards = "";
    }


    return (
      <div className="grid">
        <ReactCSSTransitionGroup transitionName="css-js--anim" transitionEnterTimeout={1000} transitionLeave={false}>
          {spec_cards}
        </ReactCSSTransitionGroup>
      </div>
    )
  }

}

export default SpecialtyGrid = connectToStores(SpecialtyGrid);
