import alt from '../alt';
import UserActions from '../actions/UserActions';

import {setCookie, killCookies, detectIsNode} from '../utils';

/*
** Temporary solution until better FE logout functionality is needed.
********************
*/
if(!detectIsNode()){
  window._logout = function(){
    killCookies();
    window.location.reload()
  }
}

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

    setCookie("auth_token", this.auth_token, 30);
    setCookie("user_role", this.user_role, 30);
  }

}

module.exports = alt.createStore(UserStore, 'UserStore');