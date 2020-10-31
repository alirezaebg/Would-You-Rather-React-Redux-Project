import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {

    handleClick = (e) => {
        e.preventDefault()

        const { dispatch } = this.props
        dispatch(setAuthedUser(null))

    }

    render() {
        const { authedUser } = this.props
        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/new' >
                            New Poll
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' >
                            Leader Board
                        </NavLink>
                    </li>
                </ul>
                <div>
                    <p>
                        Hello, {authedUser}
                    </p>
                    <button onClick={this.handleClick}>
                        <FontAwesomeIcon className='power' icon={faPowerOff} />
                    </button>
                </div>
            </nav>
        )
    }

}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(Nav)