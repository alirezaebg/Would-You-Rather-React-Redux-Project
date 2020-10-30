import { receiveUsers, updateUserAnswer, addUserQuestion } from './users'
import { receivePolls, updatePollAnswer, addPollQuestion } from './polls'
import { setAuthedUser } from './authedUser'
import { _getQuestions, _getUsers, _saveQuestion, _saveQuestionAnswer } from '../_DATA'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
    return (dispatch) => {

        return Promise.all([
            _getUsers(),
            _getQuestions(),
        ]).then(([users, polls]) => ({
            users,
            polls,
        })).then(({ users, polls }) => {
            dispatch(receiveUsers(users))
            dispatch(receivePolls(polls))
            dispatch(setAuthedUser(AUTHED_ID))
        })

    }
}

/*
    This functional action creator will be called upon answering poll. It will first save the new 
    answer into the database and then will call object action creators to update both the user and
    the poll portions of the state.
*/

export function handleSaveQuestionAnswer(qid, answer) {
    return (dispatch, getState) => {

        const { authedUser } = getState()

        const info = {
            authedUser,
            qid,
            answer,
        }

        return _saveQuestionAnswer(info)
            .then(() => {
                dispatch(updatePollAnswer(info))
                dispatch(updateUserAnswer(info))
            })
            .catch((e) => {
                console.warn('Error in answering the poll', e)
                alert('There was an error answering the poll. Please try again.')
            })
    }
}

/*
    This functional action creator will be called upon adding a new poll. It will first save the new 
    poll into the database and then will call object action creators to update both the user and the 
    poll portions of the state.
*/
export function handleAddPoll(optionOneText, optionTwoText) {
    return (dispatch, getState) => {

        const { authedUser } = getState()

        const info = {
            optionOneText,
            optionTwoText,
            author: authedUser
        }

        return _saveQuestion(info)
            .then((question) => {
                dispatch(addPollQuestion(question))
                dispatch(addUserQuestion(question))
            })
            .catch((e) => {
                console.warn('Error in adding a new poll', e)
                alert('There was an error adding the new poll. Please try again.')
            })

    }
}


