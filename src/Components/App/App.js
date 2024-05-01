import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import GithubAPI from "../../utils/GithubAPI";
import LoginBar from "../LoginBar/LoginBar";
import logo from "../../logo.png";

let accessCode = window.location.href.match(/code=([^&]*)/);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: "",
      isLoggedIn: accessCode ? true : false,
      accessToken: "",
    };
    this.login = this.login.bind(this);
    this.search = this.search.bind(this);
    this.formatMsg = this.formatMsg.bind(this);
  }

  async login() {
    let code = GithubAPI.getCode();
    let response = await GithubAPI.fetchAccessToken(code);
    this.setState({ accessToken: response.access_token });
  }

  async search(username) {
    let response = await GithubAPI.fetchRepos(username, this.state.accessToken);
    let message = this.formatMsg(response);
    this.setState({ searchResult: message });
  }

  formatMsg(response) {
    if (response === Error || response.length === 0) {
      return "Invalid username - check if there\u00A0aren't any typos 👀";
    }
    if (response[0].language === null) {
      return "This user's public repositories\u00A0are\u00A0empty ⚠️";
    }
    let answer = GithubAPI.responseMap(response);
    return `This user's favourite programming\u00A0language is ${answer}❤️`;
  }

  resultAsWords() {
    let result = this.state.searchResult;
    return result.split(" ");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Tell me a GitHub username</h1>
          <h2>and I'll guess their favourite&nbsp;language</h2>
          {this.state.isLoggedIn ? (
            <SearchBar onSearch={this.search} />
          ) : (
            <LoginBar onLogin={this.login} />
          )}
          <p className="Result">
            {this.resultAsWords().slice(0, -1).join(" ")}
          </p>
          <h3> {this.resultAsWords().slice(-1)}</h3>
        </header>
        <footer>
          Built by
          <a
            href="https://www.linkedin.com/in/paulafernandeslima/"
            target="_blank"
            rel="noreferrer"
          >
            Paula Lima
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
