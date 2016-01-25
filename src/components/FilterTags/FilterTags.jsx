import React from 'react';

import connectToStores from 'alt-utils/lib/connectToStores';
import TagStore from '../../js/stores/TagStore';
import TagActions from '../../js/actions/TagActions';
import QueryActions from '../../js/actions/QueryActions';

import FilterTagBtn from '../FilterTagBtn/FilterTagBtn';

class FilterTags extends React.Component {
  constructor() {
    super();

    this.state = {
      filter_tag_names: ""
    }
  }

  // Connects TagStore.state into this.props. Using connectToStores alt util.
  static getStores(props) {
    return [TagStore]
  };
  static getPropsFromStores(props) {
    return TagStore.getState()
  };

  componentDidMount() {
    this.refs.tag_search.focus();
  }

  handleSearchKeyUp = () => {
    console.log(this.refs.tag_search.value);
    this.setState({
      filter_tag_names: this.refs.tag_search.value
    });
  };

  clear = () => {
    TagActions.resetAllTags();
    this.refs.tag_search.value = "";
    this.setState({
      filter_tag_names: ""
    });
  };

  submit = () => {
    QueryActions.queryByTags();
  };

  checkTagActiveState(tag_name) {
    return this.props.tags_all[tag_name]
  }

  render() {
    
    // Create an array of tag buttons, passing in the active state to each one 
    let tags_render = [];
    let tags_all = this.props.tags_all;
    let filter_tag_names = this.state.filter_tag_names;

    // tags_all = Object.keys(tags_all).filter(function(tag_name){ return tag_name.indexOf(filter_tag_names) > -1 });

    for(var tag_name in tags_all){
      if (tags_all.hasOwnProperty(tag_name)) {
      
        // check if the name passes the internal search filter
        if(filter_tag_names == "" || tag_name.toLowerCase().indexOf(filter_tag_names.toLowerCase()) > -1){
          
          // return the active state bool
          let active_state = this.checkTagActiveState(tag_name);
          
          // add a tag to the render variable
          tags_render.push(
            <FilterTagBtn key={tag_name} tag_name={tag_name} is_active={active_state} />
          );
        }

      }
    }

    return (
      <div className="filter-tags">
        <p className="filter-page__title">Tags</p>
        <input className="filter-tags__search" placeholder="Search for Tags..." ref="tag_search" onKeyUp={this.handleSearchKeyUp}/>
        <div className="filter-tags__tag-bucket">
          {tags_render}
        </div>
        <div className="btn-bar">
          <button className="btn-box btn-box--cancel" onClick={this.clear}>Reset</button>
          <button className="btn-box" onClick={this.submit}>Submit</button>
        </div>
      </div>
    )
  }

}

export default FilterTags = connectToStores(FilterTags);