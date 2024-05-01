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

  search(e) {
    e.preventDefault();
    this.props.onSearch(this.state.username);
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <form onSubmit={(e) => this.search(e)} className="SearchBar">
        <input
          type="text"
          className="InputField"
          placeholder="Type a GitHub username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className="SearchButton"
          aria-label="Guess favourite language"
        >
          GUESS
        </button>
      </form>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};

export default SearchBar;
