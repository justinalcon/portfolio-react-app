import React from 'react';

export default class TabBar extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    tab_names: React.PropTypes.array.isRequired,
    tab_index: React.PropTypes.number.isRequired,
    cbSetTabState: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    tab_names: ["Default Tab"]
  };

  render() {

    // Create an array of btns with text and event handler
    let setTabState = this.props.cbSetTabState;
    let btns = this.props.tab_names.map(function(tab_name, index) {
      return (
        <button key={tab_name} className="tab-bar__btn" data-tab-index={index} onClick={setTabState.bind(this,index)}>
          {tab_name}
        </button>
      );
    });

    return (
      <div className="tab-bar" data-length={this.props.tab_names.length} data-tab-state={this.props.tab_index}>
        <div className="tab-bar__contain">
          <div className="tab-bar__flex-btns">
            {btns}
          </div>
          <div className="tab-bar__selector" />
        </div>
      </div>
    )
  }

}