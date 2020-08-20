import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import GithubAPI from '../../utils/GithubAPI';
import LoginBar from '../LoginBar/LoginBar';

let accessCode = window.location.href.match(/code=([^&]*)/);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResult : "",
      isLoggedIn : accessCode ? true : false,
      accessToken : "",
    };
    this.login = this.login.bind(this);
    this.search = this.search.bind(this);
  }

  async login() {
    let code = GithubAPI.getCode();
    let response = await GithubAPI.fetchAccessToken(code);
    this.setState({ accessToken : response.access_token });
  }

  async search(username) {
    let response = await GithubAPI.fetchRepos(username, this.state.accessToken);
    if (typeof response !== 'function') {
      response = GithubAPI.responseMap(response);
    }
    this.setState({
      searchResult : (typeof response !== 'function')
      ? `${username} favourite language is ${response}!`
      : "Invalid username, please check if there isn't any typos :)"
    })
  }

  render() {
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