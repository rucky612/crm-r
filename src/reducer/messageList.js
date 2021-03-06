import {MESSAGES} from '../actions/types'

const initState = {
    rows:[],
    count: 0,
    error: null,
    isLoading: false
}

export default function (state = initState, action) {
    switch (action.type) {
        case MESSAGES.ERROR_RESET:
            return {
                ...state,
                error: null
            }
        case MESSAGES.FETCH_REQUEST.GET:
            return {
                ...state,
                isLoading: true
            }
        case MESSAGES.FETCH_SUCCESS.GET:
            return {
                ...state,
                ...action.response,
                isLoading: false
            }
        case MESSAGES.FETCH_FAIL.GET:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        default:
            return state
    }
}