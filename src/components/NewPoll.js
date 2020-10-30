import React, { Component } from 'react'
import { connect } from 'react-redux'

class NewPoll extends Component {

    state = {
        optionA: '',
        optionB: ''
    }

    onChangeA = (e) => {
        const value = e.target.value
        this.setState(() => ({
            optionA: value
        }))
    }

    onChangeB = (e) => {
        const value = e.target.value
        this.setState(() => ({
            optionB: value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render() {

        const {optionA, optionB} = this.state

        return (
            <div className='addMain'>
                <h1>Create New Poll</h1>
                <p>Complete the question:</p>
                <form className='addForm' onSubmit={this.handleSubmit}>
                    <h2>Would you rather ...</h2>
                    <input
                        placeholder='Enter option one text here'
                        type='text'
                        value={optionA}
                        onChange={this.onChangeA}
                    />
                    <h3>OR</h3>
                    <input
                        placeholder='Enter option two text here'
                        type='text'
                        value={optionB}
                        onChange={this.onChangeB}
                    />
                    <button>
                        submit
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(NewPoll)