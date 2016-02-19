import React from 'react';

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
    // FE validation

    // AJAX with params
    console.log("submitting form", this.refs.input_username.value, this.refs.input_password.value);
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