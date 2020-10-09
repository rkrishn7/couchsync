/* eslint-disable */

import React from 'react';
import ReactDOM from 'react-dom';

const Main: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h1>Playback Sync</h1>
  </div>
);

const app = document.createElement('div');
app.id = 'extension-panel-root';
document.body.appendChild(app);
ReactDOM.render(<Main />, app);
