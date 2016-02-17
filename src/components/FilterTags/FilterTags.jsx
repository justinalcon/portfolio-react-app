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

  render() {
    
    let tags_render = [];
    let filter_tag_names = this.state.filter_tag_names;

    this.props.tags_all.forEach(function(tag_obj){
      
      // check if the name passes the internal search filter
      if(filter_tag_names == "" || tag_obj.tag.toLowerCase().indexOf(filter_tag_names.toLowerCase()) > -1){
        
        // add a component to the render variable
        tags_render.push(
          <FilterTagBtn key={tag_obj.id} tag_name={tag_obj.tag} is_active={tag_obj.state} />
        );
      }
    });

    return (
      <div className="filter-tags">
        {/*<p className="filter-page__title">Tags</p>*/}
        <input className="filter-tags__search" type="text" placeholder="Search for Tags..." ref="tag_search" onKeyUp={this.handleSearchKeyUp}/>
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