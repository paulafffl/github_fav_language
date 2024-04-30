import React from "react";
import PropTypes from "prop-types";
import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.username);
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <>
        <div className="SearchBar">
          <input
            className="InputField"
            placeholder="Type a GitHub username"
            onChange={this.handleChange}
          />
          <button className="SearchButton" onClick={this.search}>
            GUESS
          </button>
        </div>
      </>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};

export default SearchBar;
