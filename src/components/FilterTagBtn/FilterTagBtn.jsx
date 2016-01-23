import React from 'react';
import TagActions from '../../js/actions/TagActions';

export default class FilterTagBtn extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    tag_name: React.PropTypes.string.isRequired,
    is_active: React.PropTypes.bool.isRequired
  };

  handleClick = () => {
    TagActions.toggleTag(this.props.tag_name);
  };

  render() {
    return (
      <button className="filter-tag-btn" disabled={this.props.is_active} onClick={this.handleClick}>
        {this.props.tag_name}
      </button>
    )
  }

}