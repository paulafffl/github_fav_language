import React from 'react';
import './LoginBar.css'

const LoginBar = (props) => {
    return (
        <div>
            <p> First things first: log in to Github and it will grant access so we can find out your fav language</p>
            <button className="LoginButton" onClick={props.onLogin} >LOGIN</button>
        </div>
    );
}

export default LoginBar;