import { receiveUsers, updateUserAnswer } from './users'
import { receivePolls, updatePollAnswer } from './polls'
import { setAuthedUser } from './authedUser'
import { _getQuestions, _getUsers, _saveQuestionAnswer } from '../_DATA'

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
    }
}


