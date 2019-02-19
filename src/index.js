import React from 'react';
import ReactDOM from 'react-dom';
// import ReactExperimentalRenderer from './renderer';

const Text = props => {
  return <p className={props.className}>{props.content}</p>
}

class App extends React.Component {
  state = {
    inputVal: "",
    companyName: "",
    showAnimation: false
  }

  handleInputChange = (e) => {
    this.makeApiCall();
    this.setState({ inputVal: e.target.value, showAnimation: true });
  }

  makeApiCall = () => {
    return fetch('https://api.iextrading.com/1.0/stock/aapl/company')
    .then(res => res.json())
    .then(data => this.setState({ companyName: data.companyName }) )
  }

  render() {
    const { inputVal, companyName, showAnimation } = this.state;
    return (
      <div>
        <Text className="input-data" content={`Input Text: ${inputVal}`} />
        <Text className="api-data" content={`API Data: ${companyName}`} />
        <input id="input" type="text" value={inputVal} onChange={this.handleInputChange}  />
        { showAnimation && 
          <div 
            className="animation"
            style={{
              'width': '50px',
              'height': '50px',
              'backgroundColor': 'red',
              'marginTop': '10px'
            }}
          />
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
// ReactExperimentalRenderer.render(<App />, document.getElementById('root'));