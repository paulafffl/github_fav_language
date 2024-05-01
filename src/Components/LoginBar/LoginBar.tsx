import React from "react";
import "./LoginBar.css";

type LoginBarProps = {
  onLogin: () => Promise<void>;
};

class LoginBar extends React.Component<LoginBarProps> {
  constructor(props: LoginBarProps) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    this.props.onLogin();
  }

  render() {
    return (
      <div>
        <p className="Message">But first things first:</p>
        <button className="LoginButton" onClick={this.login}>
          LOG IN TO GITHUB
        </button>
      </div>
    );
  }
}

export default LoginBar;
