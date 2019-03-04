import React from 'react';
import PropTypes from 'prop-types';

function Search({ handleSearch }) {
  return (
    <div className="four wide column">
      <div className="search ui small icon input ">
        <input onChange={handleSearch} name="search" type="text" placeholder="Search Game" />
        <i className="search icon"></i>
      </div>
    </div>
  );
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired
}

export default Search;