import alt from '../alt';

class HeaderActions {
  constructor() {
    this.generateActions('updateHeaderTitle');
  }

}

module.exports = alt.createActions(HeaderActions);