import React, { Component } from 'react';
import uuid from 'uuid/v4';
import AppView from './AppView';

class AppContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      demographics: null,
      conditions: null,
      errorMessage: null,
      isFetching: false
    };

    this.onSearch = this.onSearch.bind(this);
  }

  extractDemographics(patientData) {
    let name = 'official name unknown';

    const officalName = patientData.name.find(usage => usage.use === 'official');

    if (officalName) {
      name = officalName.text;
    }

    const gender = patientData.gender;
    const dateOfBirth = patientData.birthDate;

    return { name, gender, dateOfBirth };
  }

  async fetchDemographics(patientId) {
    const response = await fetch(`${this.props.fhirBaseUrl}/Patient/${patientId}`, {
      headers: { Accept: 'application/json+fhir' }
    });

    if (response.ok) {
      const patientData = await response.json();
      return this.extractDemographics(patientData);
    } else {
      throw new Error(
        `Received error response when retrieving patient demographic data. Status code ${
          response.status
        }`
      );
    }
  }

  async extractConditions(conditionsData) {
    if (conditionsData.total === 0) {
      return [];
    }

    return conditionsData.entry.map(({ resource }) => ({
      id: uuid(),
      name: resource.code.text,
      dateRecorded: resource.dateRecorded
    }));
  }

  async fetchConditions(patientId) {
    const response = await fetch(`${this.props.fhirBaseUrl}/Condition?patient=${patientId}`, {
      headers: { Accept: 'application/json+fhir' }
    });

    if (response.ok) {
      const conditionsData = await response.json();
      return this.extractConditions(conditionsData);
    } else {
      throw new Error(
        `Received error response when retrieving patient condition data. Status code ${
          response.status
        }`
      );
    }
  }

  async onSearch(patientId) {
    this.setState(previousState => ({
      ...previousState,
      isFetching: true,
      error: false,
      demographics: null,
      conditions: null
    }));

    try {
      const demographics = await this.fetchDemographics(patientId);
      const conditions = await this.fetchConditions(patientId);

      this.setState(previousState => ({
        ...previousState,
        demographics,
        conditions,
        isFetching: false
      }));
    } catch (fetchError) {
      const errorMessage = fetchError.message;
      this.setState(previousState => ({ ...previousState, errorMessage, isFetching: false }));
    }
  }

  render() {
    return <AppView state={this.state} onSearch={this.onSearch} />;
  }
}

export default AppContainer;
