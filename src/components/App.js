import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import { handleInitialData } from '../actions/shared'
import PollQuestion from './PollQuestion'
import Leaderboard from './Leaderboard'
import NewPoll from './NewPoll'
import Nav from './Nav'
import '../styles/App.css';
import '../styles/AddPoll.css'
import Login from './Login'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <div className='main'>
          <Nav />
          <h1 className='dash-title'>Welcome To <em>Would You Rather</em> Game</h1>         
          {this.props.loading === true
            ? <Route path='/' exact component={Login} />
            : <div>
              <Route path='/' exact component={Dashboard} />
              <Route path='/questions/:question_id' component={PollQuestion} />
              <Route path='/add' component={NewPoll} />
              <Route path='/leaderboard' component={Leaderboard} />
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
