import {TEMPLATES} from '../actions/types'

const initState = {
    key: "",
    title: "",
    body: "",
    memo: "",
    replacements: [],
    isLoading: false,
    error: null
}

export default function (state = initState, action) {
    const {target} = action
    switch (action.type) {
        case TEMPLATES.ERROR_RESET:
            return {
                ...state,
                error: null
            }
        case TEMPLATES.FETCH_REQUEST.INIT_POST:
            return {
                ...initState,
            }
        case TEMPLATES.FETCH_REQUEST.GET:
        case TEMPLATES.FETCH_REQUEST.POST:
            return {
                ...state,
                isLoading: true,
            }
        case TEMPLATES.FETCH_SUCCESS.POST:
            return {
                ...state,
                isLoading: false
            }
        case TEMPLATES.FETCH_SUCCESS.GET_ONE:
            return {
                ...state,
                ...action.response,
                isLoading: false
            }
        case TEMPLATES.FETCH_FAIL.POST:
        case TEMPLATES.FETCH_FAIL.PUT:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }
        case TEMPLATES.EDIT:
            return {
                ...state,
                [target.name]: target.value
            }
        case TEMPLATES.EDIT_REPLACEMENT:
            return {
                ...state,
                replacements: [
                    ...state.replacements.slice(0, action.index),
                    {
                        ...state.replacements[action.index],
                        [target.name]: target.value
                    },
                    ...state.replacements.slice(action.index + 1, state.replacements.length),
                ]
            }
        case TEMPLATES.ADD_REPLACEMENT:
            return {
                ...state,
                replacements: [
                    ...state.replacements,
                    {
                        title: "",
                        keyword: "",
                        maxByte: "",
                        defaultValue: ""
                    }
                ]
            }
        case TEMPLATES.REMOVE_REPLACEMENT:
            return {
                ...state,
                replacements: [
                    ...state.replacements.slice(0, action.index),
                    ...state.replacements.slice(action.index + 1, state.replacements.length),
                ]
            }
        case TEMPLATES.RESET_REPLACEMENT:
            return {
                ...state,
                replacements: []
            }
        default:
            return state
    }
}