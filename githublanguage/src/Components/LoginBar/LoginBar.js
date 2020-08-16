import React, {Component} from 'react';
import './LoginBar.css'

class LoginBar extends Component {

    render () {
        return (
            <div>
                <p> First things first, click here to login on GitHub </p>
                <button className="LoginButton" onClick={this.props.onLogin} >LOGIN</button>
            </div>
        );
    }
}

export default LoginBar;