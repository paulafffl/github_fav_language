import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import GithubAPI from '../../utils/GithubAPI';
import LoginBar from '../LoginBar/LoginBar';
const accessCode = window.location.href.match(/code=([^&]*)/);

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      isLoggedIn : accessCode ? true : false
    };
    this.login = this.login.bind(this);
    this.search = this.search.bind(this);
  }

  login(){
      GithubAPI.getAccessToken()
  }

  search(username){
    GithubAPI.search(username).then( languages => {
      this.setState({
        searchResults: languages
      })
    });
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
        <p> {this.state.searchResults} </p>
      </header>
    </div>
  )};
}

export default App;