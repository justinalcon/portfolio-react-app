import React from 'react';

import QueryActions from '../../js/actions/QueryActions';

export default class SearchPage extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.refs.search_input.focus();
  }

  handleKeyDown = (event) => {
    
    // 13 = Enter
    // 27 = ESC

    if(event.keyCode == 13){
      this.submit();  
    } else if(event.keyCode == 27) {
      this.exit();
    }
    
  };

  exit = () => {
    alert("exit search, goto home");
  };

  clear = () => {
    this.refs.search_input.value = "";
    this.refs.search_input.focus();
    // Clear posts from previous search query
  };

  submit = () => {
    let search_term = this.refs.search_input.value;
    QueryActions.querySearch(search_term);
  };

  render() {
    return (
      <div className="search-page">
        <input className="search-page__input" placeholder="Search all of Discovery..." ref="search_input" onKeyDown={this.handleKeyDown}/>
        <div className="btn-bar">
          <button className="btn-box btn-box--cancel" onClick={this.clear}>Reset</button>
          <button className="btn-box" onClick={this.submit}>Submit</button>
        </div>
      </div>
    )
  }

}