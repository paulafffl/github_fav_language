import React from "react";
import PropTypes from "prop-types";
import "./LoginBar.css";

class LoginBar extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    this.props.onLogin(this.props.onLogin);
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

LoginBar.propTypes = {
  onLogin: PropTypes.func,
};

export default LoginBar;
