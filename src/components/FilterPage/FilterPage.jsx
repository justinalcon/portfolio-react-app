import React from 'react';
import FilterTags from '../FilterTags/FilterTags';

export default class FilterPage extends React.Component {
  constructor() {
    super();
  }

  backToIndex = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="filter-page css-js--fade-in">
        <FilterTags backToIndex={this.backToIndex}/>
      </div>
    )
  }

}