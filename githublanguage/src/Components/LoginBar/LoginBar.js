import React from 'react';
import './LoginBar.css'

const LoginBar = (props) => {
    return (
        <div>
            <p> First things first: please log in to Github</p>
            <button className="LoginButton" onClick={props.onLogin} >LOGIN</button>
        </div>
    );
}

export default LoginBar;