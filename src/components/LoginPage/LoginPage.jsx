import React from 'react';

import UserActions from '../../js/actions/UserActions';

import axios from 'axios';
import {endpoint_url} from '../../js/utils';

export default class LoginPage extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.refs.input_username.focus();
  } 

  handleKeyDown = (event) => {
    
    // 13 = Enter
    if(event.keyCode == 13){
      this.submitForm();
    }
    
  };

  submitForm = () =>{

    /***** TEMP */
    let username = "test@test.com";//this.refs.input_username.value;
    let password = "testtest";//this.refs.input_password.value;
    /***** */

    // AJAX with params
    axios.post(`${endpoint_url}/api/login.json?email=${username}&password=${password}`)
      .then(function (response) {
        // success
        UserActions.saveCredentials(response.data);

        // check for UserStore.pre_login_req_url
        this.props.history.push("/");
        
      }.bind(this))
      .catch(function (response) {
        // Fail
        console.error(response);
        // show a view notification
      });
  };

  render() {
    return (
      <div className="login-page">
        <div className="login-page__box" onKeyDown={this.handleKeyDown}>
          <input className="login-page__input" id="username" ref="input_username" type="text" placeholder="Email" tabIndex="1"/>
          <input className="login-page__input" id="password" ref="input_password" type="password" placeholder="Password" tabIndex="2"/>
          <br />
          <button className="btn-box login-page__submit" tabIndex="3" onClick={this.submitForm}>Login</button>
        </div>
      </div>
    )
  }

}