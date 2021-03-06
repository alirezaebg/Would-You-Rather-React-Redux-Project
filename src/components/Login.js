import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import logo from '../pic.jpeg'

class Login extends Component {

    state = {
        option: ''
    }

    onChange = (e) => {
        const value = e.target.value
        this.setState(() => ({
            option: value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { dispatch } = this.props
        const { option } = this.state

        if (option !== '') dispatch(setAuthedUser(option))

        this.setState(() => ({
            option: ''
        }))

    }

    render() {
        return (
            <Fragment>
                <h1 className='dash-title'>Welcome To <em>Would You Rather</em> Game</h1>
                <div className='login'>
                    <h2>Sign in</h2>
                    <div>
                        <img src={logo} alt='WUR logo' />
                    </div>
                    <form className='loginForm' onSubmit={this.handleSubmit}>
                        <select onChange={this.onChange}>
                            <option value=''>Select a user...</option>
                            <option value='sarahedo'>Sarah Edo</option>
                            <option value='tylermcginnis'>Tyler McGinnis</option>
                            <option value='johndoe'>John Doe</option>
                        </select>
                        <button type='submit'>
                            sign in
                    </button>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default connect()(Login)