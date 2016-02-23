import React from 'react';

import UserStore from '../../js/stores/UserStore';
import UserActions from '../../js/actions/UserActions';
import PostActions from '../../js/actions/PostsActions';

import axios from 'axios';
import {ENDPOINT_URL, validateEmail} from '../../js/utils';

export default class LoginPage extends React.Component {
  constructor() {
    super();

    this.state = {
      email_valid: true,
      password_valid: true,
      error_message: ""
    }
  }

  componentDidMount() {
    this.refs.input_email.focus();
  } 

  handleKeyDown = (event) => {
    
    // 13 = Enter
    if(event.keyCode == 13){
      this.submitForm();
    }
    
  };

  frontEndValidation = () => {
    
    // Check username
    if(validateEmail(this.refs.input_email.value) == false){
      this.setState({ 
        email_valid: false,
        error_message: "That email looks funky. Please check the format."
      });
      return false;
    } else {
      this.setState({ 
        email_valid: true,
        error_message: ""
      });
    }

    // Check password
    if(this.refs.input_password.value.length == 0){
      this.setState({ 
        password_valid: false,
        error_message: "C'mon man. Put in a password."
      });
      return false;
    } else {
      this.setState({ 
        password_valid: true,
        error_message: ""
      });
    }

    return true;
  };

  submitForm = () => {

    // Check FE Validation. Exit immediately if an error is found.
    if(!this.frontEndValidation()){
      return false;
    }

    let username = this.refs.input_email.value;
    let password = this.refs.input_password.value;

    // AJAX with params
    axios.post(`${ENDPOINT_URL}/api/login.json?email=${username}&password=${password}`)
      .then(function (response) {
        // SUCCESS
        UserActions.saveCredentials(response.data);

        // check for UserStore.pre_login_req_url
        var redirect_url = UserStore.getState().pre_login_req_url;
        if(redirect_url == "") redirect_url = "/";

        // Redirect. Force reload so that all endpoints can be hit with provided auth_key from api/login.
        location.href = redirect_url; // this.props.history.push("/");
        
      }.bind(this))
      .catch(function (response) {
        
        // FAIL
        // show a view notification
        if(response.status == 401){
          this.setState({ 
            email_valid: false,
            password_valid: false,
            error_message: "Username/Password combination did not match our system."
          });
        } else {
          console.error("Undetected error code", response.status);  
          this.setState({ 
            email_valid: false,
            password_valid: false,
            error_message: "Please double-check username/password."
          });
        }        
        
      }.bind(this));
  };

  render() {

    let username_classes = "login-page__input";
    if(!this.state.email_valid){
      username_classes += " input--error";
    }

    let password_classes = "login-page__input";
    if(!this.state.password_valid){
      password_classes += " input--error";
    }

    return (
      <div className="login-page">
        <div className="login-page__box" onKeyDown={this.handleKeyDown}>
          <input className={username_classes} id="username" ref="input_email" type="text" placeholder="Email" tabIndex="1"/>
          <input className={password_classes} id="password" ref="input_password" type="password" placeholder="Password" tabIndex="2"/>
          <p className="login-page__error-msg">{this.state.error_message}</p>
          <br />
          <button className="btn-box login-page__submit" tabIndex="3" onClick={this.submitForm}>Login</button>
        </div>
      </div>
    )
  }

}