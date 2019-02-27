import React from 'react';

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
        <span style="color: blue;" autofocus>Hello, World</span>
        <button onClick={this.onButtonClick}>Get Current Time</button>
      </div>
    )
  }
}

export default App;