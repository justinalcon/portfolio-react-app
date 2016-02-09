import React from 'react';
import FilterTags from '../FilterTags/FilterTags';

export default class FilterPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="filter-page css-js--fade-in">
        <FilterTags />        
      </div>
    )
  }

}