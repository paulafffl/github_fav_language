import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import GithubAPI from '../../utils/GithubAPI';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
    };
    this.search = this.search.bind(this);
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
        <p> What’s your favourite programming language? </p>
        <SearchBar onSearch = {this.search}/>
        <p> {this.state.searchResults} </p>
      </header>
    </div>
  )};
}

export default App;