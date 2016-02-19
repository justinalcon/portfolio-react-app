import alt from '../alt';
import UserActions from '../actions/UserActions';

class UserStore {
  constructor() {
    
    // session token provided by /api/login
    this.auth_token = "";

    // the CMS provided user role
    this.user_role = "";

    // boolean to track login state
    this.is_logged_in = false;

    // if browser request is redirected to login, save the original request here
    this.pre_login_req_url = "";

    this.bindListeners({
      handleSaveCredentials: UserActions.saveCredentials
    });

  }

  handleSaveCredentials(data){
    /* expecting response JSON {
        message: AUTH_KEY
        user_role: USER_ROLE
    }*/
    this.auth_token = data[0].message;
    this.user_role = data[0].user_role;
    this.is_logged_in = true;
  }

}

module.exports = alt.createStore(UserStore, 'UserStore');