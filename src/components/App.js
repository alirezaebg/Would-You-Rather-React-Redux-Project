import React, { Component } from 'react'
import Dashboard from "./Dashboard"
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import '../App.css';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className='main'>
        <h1>Your Dashboard</h1>
        <Dashboard />
      </div>
    )
  }
}

export default connect()(App)
