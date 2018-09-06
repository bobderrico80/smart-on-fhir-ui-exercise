import React from 'react';
import moment from 'moment';

const Demographics = ({ demographics }) => {
  return (
    <section className="demographics">
      <h2>Patient Demographics</h2>
      <ul>
        <li>
          <span className="patient-demographic-key">Name: </span>
          <span className="patient-demographic-value">{demographics.name}</span>
        </li>
        <li>
          <span className="patient-demographic-key">Gender: </span>
          <span className="patient-demographic-value">{demographics.gender}</span>
        </li>
        <li>
          <span className="patient-demographic-key">Date of Birth: </span>
          <span className="patient-demographic-value">
            {moment(demographics.dateOfBirth).format('l')}
          </span>
        </li>
      </ul>
    </section>
  );
};

export default Demographics;
