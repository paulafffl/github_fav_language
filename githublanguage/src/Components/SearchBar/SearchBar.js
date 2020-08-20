import React from 'react';
import PropTypes from 'prop-types';
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
        <p className="Message"> Type a Github username below and I'll guess this user favourite language</p>
        <input className="InputField" placeholder="Username" onChange={this.handleChange}/>
        <button className="SearchButton" onClick={this.search} >GUESS IT</button>
      </div>
    )
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func
}

export default SearchBar;