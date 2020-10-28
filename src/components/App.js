import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dashboard from "./Dashboard"
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import PollQuestion from './PollQuestion'
import '../App.css';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <div className='main'>
          <h2 className='dash-title'>Welcome to <em>Would You Rather</em> Game</h2>
          {this.props.loading === true
            ? null
            : <div>
              <Route path='/' exact component={Dashboard} />
              <Route path='/questions/:question_id' component={PollQuestion} />
            </div>
          }
        </div>
      </Router>

    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
