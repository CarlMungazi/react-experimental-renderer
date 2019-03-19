// import React from 'react';
// import ReactDOM from 'react-dom';

import React from './react';
import ReactExperimentalRenderer from './renderer';
import Input from 'react-experimental-input/Input';

import BasicRenderer from './examples/BasicRenderer';
import TimeSlicing from './examples/time-slicing/TimeSlicingDemo';

class App extends React.Component {
  state = {
    text: Date.now(),
    inputText: ""
  }

// ReactExperimentalRenderer.render(<BasicRenderer />, container);
ReactDOM.render(
  <React.unstable_ConcurrentMode>
    <TimeSlicing />
  </React.unstable_ConcurrentMode>,
  container
);

  onInputChange = (e) => {
    this.setState({ inputText: e.target.value });
  }

  render() {
    return (
      <div>
        <Text className="hello-class" content={this.state.text} />
        <span style="color: blue;" autofocus>World</span>
        <button onClick={this.onButtonClick}>Get Current Time</button>
        <Input 
          value={this.state.inputText}
          onChange={ e => this.onInputChange(e.target.value)}
          placeholder="Enter your input"
          id="class-input"
        />
      </div>
    )
  }
}

ReactExperimentalRenderer.render(
  <App />, 
  document.getElementById('root')
);
