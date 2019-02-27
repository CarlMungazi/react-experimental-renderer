import React from 'react';
import ReactDOM from 'react-dom';
import ReactExperimentalRenderer from './renderer';

import BasicRenderer from './examples/BasicRenderer';
import TimeSlicing from './examples/time-slicing/TimeSlicingDemo';

const container = document.getElementById('root');

// ReactExperimentalRenderer.render(<BasicRenderer />, container);
ReactDOM.render(
  <React.unstable_ConcurrentMode>
    <TimeSlicing />
  </React.unstable_ConcurrentMode>,
  container
);

// The code above is equivalent to the code below
// ReactDOM.render(
//   React.createElement(
//     React.unstable_ConcurrentMode, 
//     null, 
//     React.createElement(
//       TimeSlicing, 
//       null
//     )
//   ), 
//   container
// );