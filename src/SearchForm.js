import React, { Component } from 'react';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = { patientId: '' };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ patientId: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSearch(this.state.patientId);
  }

  render() {
    return (
      <section className="patient-lookup">
        <form className="form-inline" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="patient-id">Patient ID: </label>
            <input
              className="form-control"
              id="patient-id"
              name="patient-id"
              type="text"
              value={this.state.value}
              onChange={this.onChange}
            />
          </div>
          <input type="submit" value="Search" className="btn btn-primary" />
          <small className="form-text text-muted">
            <a
              href="https://github.com/cerner/ignite-learning-lab/wiki/FHIR-Core-Concepts#test-patients"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here for some sample patient IDs
            </a>
          </small>
        </form>
      </section>
    );
  }
}

export default SearchForm;
