import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import GithubAPI from "../../utils/GithubAPI";
import LoginBar from "../LoginBar/LoginBar";
import logo from "../../logo.svg";

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
  }

  async login() {
    let code = GithubAPI.getCode();
    let response = await GithubAPI.fetchAccessToken(code);
    this.setState({ accessToken: response.access_token });
  }

  async search(username) {
    let response = await GithubAPI.fetchRepos(username, this.state.accessToken);
    if (typeof response !== "function") {
      response = GithubAPI.responseMap(response);
    }
    this.setState({
      searchResult:
        typeof response !== "function"
          ? !response
            ? `This user doesn't have any repositories ⚠️`
            : `This user's favourite programming language is ${response}!`
          : "Invalid username. Please check if there aren't any typos 👀",
    });
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
          <h2>and I'll guess their favourite language</h2>
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
      </div>
    );
  }
}

export default App;
