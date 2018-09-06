import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import AppContainer from './AppContainer';
import registerServiceWorker from './registerServiceWorker';

const fhirBaseUrl =
  'https://fhir-open.sandboxcerner.com/dstu2/0b8a0111-e8e6-4c26-a91c-5069cbc6b1ca';

ReactDOM.render(<AppContainer fhirBaseUrl={fhirBaseUrl} />, document.getElementById('root'));
registerServiceWorker();
