import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import { handleInitialData } from '../actions/shared'
import PollQuestion from './PollQuestion'
import Leaderboard from './Leaderboard'
import NewPoll from './NewPoll'
import Login from './Login'
import Nav from './Nav'
import '../styles/App.css';
import '../styles/AddPoll.css'


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <div className='main'>
          {this.props.authedUser === null
            ? (
              <Route path='/' component={Login} />
            )
            : (
              <Fragment>
                <Nav />
                <h1 className='dash-title'>Welcome To <em>Would You Rather</em> Game</h1>
                <Switch>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/questions/:question_id' component={PollQuestion} />
                  <Route path='/new' component={NewPoll} />
                  <Route path='/leaderboard' component={Leaderboard} />
                </Switch>
              </Fragment>
            )
          }
        </div>
      </Router>

    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(App)
