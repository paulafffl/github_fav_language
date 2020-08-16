import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import GithubAPI from '../../utils/GithubAPI';
import LoginBar from '../LoginBar/LoginBar';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      loginVisibility: true
    };
    this.login = this.login.bind(this);
    this.search = this.search.bind(this);
  }

  login(){
      GithubAPI.getAccessToken().then (() => {
        this.setState({
          loginVisibility : !this.state.loginVisibility
        })
      })
  }

  search(username){
    GithubAPI.search(username).then( languages => {
      this.setState({
        searchResults: languages
      })
    });
  }

  render(){
    const codeMatched = window.location.href.match(/code=([^&]*)/);
    return (
    <div className="App">
      <header className="App-header">
        <h1> What’s your favourite programming language? </h1>
        {!codeMatched && 
          <LoginBar onLogin = {this.login}/>
        }
        {codeMatched && 
        <SearchBar onSearch = {this.search}/>
        }
        <p> {this.state.searchResults} </p>
      </header>
    </div>
  )};
}

export default App;