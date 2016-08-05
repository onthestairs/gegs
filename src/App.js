import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="gridHolder">
          <Grid />
        </div>
      </div>
    );
  }
}

export default App;
