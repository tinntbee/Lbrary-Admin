import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import SearchIcon from "../Icon/SearchIcon";
import CloseIcon from "../Icon/CloseIcon";

SearchInput.propTypes = {};

function SearchInput(props) {
  const { handleFilter } = props;
  const _inputRef = React.useRef();
  const [state, setState] = React.useState("");
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleFilter(state);
      _inputRef.current.blur();
    }
  }
  function handleClear() {
    setState("");
    handleFilter("");
    _inputRef.current.blur();
  }
  return (
    <div className="search-input">
      <SearchIcon />
      <input
        ref={_inputRef}
        placeholder="Tìm kiếm..."
        value={state}
        onChange={(e) => {
          setState(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      {state !== "" && (
        <button className="bee-btn red" onClick={handleClear}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
