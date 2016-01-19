import React from 'react';

export default class TabBar extends React.Component {
  constructor() {
    super();
  }

  static propTypes = {
    tab_names: React.PropTypes.array,
    tab_index: React.PropTypes.number.isRequired
    // cbSetTabState
  };

  static defaultProps = {
    tab_names: ["Default Tab"],
    cbSetTabState : function(){}
  };

  setTabState(index) {
    this.props.cbSetTabState(index);
  };

  render() {

    let setTabState = this.props.cbSetTabState;
    let tabs = this.props.tab_names.map(function(tab, index){
      return (
        <button key={tab} onClick={setTabState.bind(this,index)}>
          {tab}
        </button>
      );
    });

    return (
      <div>
        <p>nav.tab_index:{this.props.tab_index}</p>
        {tabs}
      </div>
    )
  }

}