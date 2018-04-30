import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }
  render() {
    return (
      <div>
        <h1>Hello React Skeleton!!!{this.state.name}</h1>
        <button onClick={()=>{this.setState({name:'velopert'});}}>click here</button>
      </div>
    );
  }
}

export default App;
