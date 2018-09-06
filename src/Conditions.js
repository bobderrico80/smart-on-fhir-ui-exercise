import React, { Component } from 'react';
import moment from 'moment';

const sortKeys = {
  NAME: 'name',
  DATE_RECORDED: 'dateRecorded'
};

const sortDirections = {
  ASCENDING: 1,
  DESCENDING: -1
};

class Conditions extends Component {
  constructor(props) {
    super(props);
    this.pubMedBaseUrl = 'https://www.ncbi.nlm.nih.gov/pubmed/?term=';

    this.state = {
      data: props.conditions,
      sortKey: null,
      sortDirection: sortDirections.ASCENDING
    };

    this.handleSort = this.handleSort.bind(this);
  }

  handleSort(sortKey) {
    this.setState(previousState => {
      let sortDirection;

      if (previousState.sortKey !== sortKey || !previousState.sortDirection) {
        sortDirection = sortDirections.ASCENDING;
      } else {
        sortDirection = -previousState.sortDirection;
      }

      const sortedData = previousState.data.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) {
          return -sortDirection;
        }

        if (a[sortKey] > b[sortKey]) {
          return sortDirection;
        }

        return 0;
      });

      return { ...previousState, data: sortedData, sortDirection, sortKey };
    });
  }

  render() {
    return (
      <section className="conditions">
        <h2>Patient Conditions</h2>
        <table className="table">
          <thead>
            <tr>
              <th
                className="sortable"
                title="Click to sort by condition name"
                onClick={() => this.handleSort(sortKeys.NAME)}
              >
                Condition Name
              </th>
              <th
                className="sortable"
                title="Click to sort by date recorded"
                onClick={() => this.handleSort(sortKeys.DATE_RECORDED)}
              >
                Date Recorded
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(condition => (
              <tr key={condition.id}>
                <td>{condition.name}</td>
                <td>{moment(condition.dateRecorded).format('l')}</td>
                <td>
                  <a
                    href={encodeURI(`${this.pubMedBaseUrl}${condition.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Search on PubMed
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Conditions;
