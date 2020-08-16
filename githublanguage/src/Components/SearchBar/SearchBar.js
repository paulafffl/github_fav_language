import React from 'react';
import './SearchBar.css'

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username : ''
    };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  search(){
    this.props.onSearch(this.state.username);
  }

  handleChange(e){
    this.setState({username: e.target.value});
  } 
  
  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter GitHub Username" onChange={this.handleChange}/>
        <button className="SearchButton" onClick={this.search} >GUESS FAVOURITE LANGUAGE</button>
      </div>
    )
  }
}

export default SearchBar;