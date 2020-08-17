import React from 'react';
import './LoginBar.css'

class LoginBar extends React.Component {
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
  }

  login(){
    this.props.onLogin(this.props.onLogin) 
  }

  render() {
    return (
      <div>
        <p className="Message"> First things first: please log in to Github</p>
        <button className="LoginButton" onClick={this.login} >LOGIN</button>
      </div>
    );
  }
}

export default LoginBar;