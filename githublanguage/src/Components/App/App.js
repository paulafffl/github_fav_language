import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import GithubAPI from '../../utils/GithubAPI';
import LoginBar from '../LoginBar/LoginBar';

let accessCode = window.location.href.match(/code=([^&]*)/);
let accessToken;

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchResult: "",
      isLoggedIn : accessCode ? true : false
    };
    this.login = this.login.bind(this);
    this.search = this.search.bind(this);
  }

  async login(){
    let code = GithubAPI.getCode();
    let response = await GithubAPI.fetchAccessToken(code);
    accessToken = response.access_token;
  }

  async search(username, accessToken){
    let response = await GithubAPI.fetchRepos(username, accessToken);
    if (typeof response !== 'function') {
      response = GithubAPI.responseMap(response);
    }
    this.setState({
      searchResult : (typeof response !== 'function')
      ? `${username}'s favourite language is ${response}!`
      : "Invalid username, please check if there isn't any typos :)"
    })
  }

  render(){
    return (
    <div className="App">
      <header className="App-header">
        <h1> What’s your favourite programming language? </h1>
        {this.state.isLoggedIn
        ? <SearchBar onSearch = {this.search}/>
        : <LoginBar onLogin = {this.login}/>
        }
        <p> {this.state.searchResult} </p>
      </header>
    </div>
  )};
}

export default App;