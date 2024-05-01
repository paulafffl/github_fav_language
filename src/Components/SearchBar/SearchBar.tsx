import React, { ChangeEvent, FormEvent } from "react";
import "./SearchBar.css";

type SearchBarProps = {
  onSearch: (username: string) => void;
};

type SearchBarState = {
  username: string;
};

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      username: "",
    };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  search(e: FormEvent) {
    e.preventDefault();
    this.props.onSearch(this.state.username);
  }

  handleChange(e: ChangeEvent<HTMLInputElement>) {
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

export default SearchBar;
