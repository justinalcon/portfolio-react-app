import alt from '../alt';
import HeaderActions from '../actions/HeaderActions';

class HeaderStore {
  constructor() {
    
    this.header_title = "";

    this.bindListeners({
      onUpdateHeaderTitle: HeaderActions.UPDATE_HEADER_TITLE
    });

  }

  onUpdateHeaderTitle(text) {
    this.header_title = text;
  }

}

module.exports = alt.createStore(HeaderStore, 'HeaderStore');