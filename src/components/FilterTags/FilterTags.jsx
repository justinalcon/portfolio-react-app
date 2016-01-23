import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import TagStore from '../../js/stores/TagStore';
import FilterTagBtn from '../FilterTagBtn/FilterTagBtn';

class FilterTags extends React.Component {
  constructor() {
    super();
  }

  // Connects TagStore.state into this.props. Using connectToStores alt util.
  static getStores(props) {
    return [TagStore]
  };
  static getPropsFromStores(props) {
    return TagStore.getState()
  };

  checkTagActiveState(tag_name) {
    return this.props.tags_all[tag_name]
  }

  render() {
    
    let tags_render = [];

    for(var tag_name in this.props.tags_all){
      if (this.props.tags_all.hasOwnProperty(tag_name)) {
    
        let is_active = this.checkTagActiveState(tag_name);

        tags_render.push(
          <FilterTagBtn key={tag_name} tag_name={tag_name} is_active={is_active} />
        );

      }
    }

    return (
      <div className="filter-tags">
        Filter Tags!
        <div className="filter-tags__tag-bucket">
          {tags_render}
        </div>
      </div>
    )
  }

}

export default FilterTags = connectToStores(FilterTags);