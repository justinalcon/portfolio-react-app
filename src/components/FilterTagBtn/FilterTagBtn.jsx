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

    let btn_class = "filter-tag-btn";
    if(this.props.is_active){
      btn_class += " filter-tag-btn--active";
    }

    return (
      <button className={btn_class} onClick={this.handleClick}>
        {this.props.tag_name}
      </button>
    )
  }

}