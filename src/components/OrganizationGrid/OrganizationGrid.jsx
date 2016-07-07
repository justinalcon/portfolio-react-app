import React from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import connectToStores from 'alt-utils/lib/connectToStores';
import OrganizationsStore from '../../js/stores/OrganizationsStore';
import HeaderActions from '../../js/actions/HeaderActions';

import SparkCard from '../SparkCard/SparkCard';

class OrganizationGrid extends React.Component {
  constructor() {
    super();
  }

  state = {
    organization_data : OrganizationsStore.getState().current_organizations
  };

  // Connects TechnologiesStore.state into this.props. Using connectToStores alt util.
  static getStores(props) {
    return [OrganizationsStore]
  };
  static getPropsFromStores(props) {
    return OrganizationsStore.getState()
  };


  componentDidMount() {
    // On home view, reset Header to default state
    HeaderActions.updateHeaderTitle("");
  }

  render() {

    let cards;

    if(this.props.current_organizations.length > 0){
      cards = this.props.current_organizations.map((org) => {
        return (
          <div className="grid__item css-js--fade-in css-js--fade-in-instant" key={org.id}>
            <SparkCard spark_data={org} />
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

export default OrganizationGrid = connectToStores(OrganizationGrid);
