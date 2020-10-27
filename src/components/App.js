import React, { Component } from 'react';
import Dashboard from "./Dashboard";

import '../App.css';

class App extends Component {
  render() {
    return (
      <div className='main'>
        <h1>Your Dashboard</h1>
        <Dashboard />
      </div>
    )
  }
}

export default App;
