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
  
  render() {
    return (
      <div className="SearchBar">
        <button className="SearchButton" onClick={this.search} >GUESS FAVOURITE LANGUAGE</button>
      </div>
    )
  }
}

export default SearchBar;