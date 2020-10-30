export const RECEIVE_POLLS = 'RECEIVE_POLLS'
export const UPDATE_POLL_ANSWER = 'UPDATE_POLL_ANSWER'
export const ADD_POLL_QUESTION = 'ADD_POLL_QUESTION'

export function receivePolls(polls) {
    return {
        type: RECEIVE_POLLS,
        polls,
    }
}

export function updatePollAnswer({ authedUser, qid, answer }) {
    return {
        type: UPDATE_POLL_ANSWER,
        authedUser,
        qid,
        answer,
    }
}

export function addPollQuestion(question) {
    return {
        type: ADD_POLL_QUESTION,
        question
    }
}