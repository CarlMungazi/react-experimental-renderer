// import React from 'react';
// import ReactDOM from 'react-dom';

import React from './react';
import ReactExperimentalRenderer from './renderer';

const Text = props => {
  return <p className={props.className}>{props.content}</p>
}

class App extends React.Component {
  state = {
    text: Date.now(),
    inputText: ""
  }

  onButtonClick = () => this.setState(
      () => ({ text: Date.now() })
    )

  onInputChange = (e) => {
    this.setState({ inputText: e.target.value });
  }

  render() {
    return (
      <div>
        <Text className="hello-class" content={this.state.text} />
        <span style="color: blue;" autofocus>World</span>
        <button onClick={this.onButtonClick}>Get Current Time</button>
        <input 
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