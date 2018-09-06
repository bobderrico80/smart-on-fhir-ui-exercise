import React from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

const AppView = ({ state, onSearch }) => {
  return (
    <div className="container">
      <div className="col-sm-12">
        <header>
          <h1>FHIR Patient Lookup</h1>
        </header>
        <main>
          <SearchForm onSearch={onSearch} />
          <SearchResults state={state} />
        </main>
      </div>
    </div>
  );
};

export default AppView;
