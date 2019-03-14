import React from 'react';
// import ReactDOM from 'react-dom';
import ReactExperimentalRenderer from './renderer';

const Text = props => {
  return <p className={props.className}>{props.content}</p>
}

class App extends React.Component {
  state = {
    text: Date.now(),
  }

  onButtonClick = () => {
    this.setState(() => ({ text: Date.now() }))
  }

  render() {
    return (
      <div>
        <Text className="hello-class" content={this.state.text} />
        <span style="color: blue;" autofocus>World</span>
        <button onClick={this.onButtonClick}>Get Current Time</button>
      </div>
    )
  }
}

ReactExperimentalRenderer.render(<App />, document.getElementById('root'));