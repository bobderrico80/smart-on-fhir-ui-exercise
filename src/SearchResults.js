import React from 'react';
import Demographics from './Demographics';
import Conditions from './Conditions';

const SearchResults = ({ state }) => {
  if (state.isFetching) {
    return <div className="loading-text">Loading search results...</div>;
  }

  if (state.errorMessage) {
    return <div className="error-text text-danger">{state.errorMessage}</div>;
  }

  if (!state.demographics || !state.conditions) {
    return null;
  }

  return (
    <div className="search-results">
      <Demographics demographics={state.demographics} />
      <Conditions conditions={state.conditions} />
    </div>
  );
};

export default SearchResults;
