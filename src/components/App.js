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
        {this.props.loading === true
          ? null
          : <div>
            <Dashboard />
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
