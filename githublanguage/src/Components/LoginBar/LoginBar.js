import React, {Component} from 'react';
import './LoginBar.css'

class LoginBar extends Component {

    render () {
        return (
            <div>
                <p> First things first: log in to Github and it will grant access so we can find out your fav language</p>
                <button className="LoginButton" onClick={this.props.onLogin} >LOGIN</button>
            </div>
        );
    }
}

export default LoginBar;