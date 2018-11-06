import {MESSAGES} from '../actions/types'

const initState = {
    rows: [],
    row: {},
    count: 0,
    error: null,
    templateKey: "",
    receivers: []
}

export default function (state = initState, action) {
    switch (action.type) {
        case MESSAGES.EDIT_PHONENUM:
            return {
                ...state,
                receivers: [
                    ...state.receivers.slice(0, action.index),
                    {
                        ...state.receivers[action.index],
                        phoneNum: action.phoneNum
                    },
                    ...state.receivers.slice(action.index + 1, state.receivers.length)
                ]
            }
        case MESSAGES.REOMVE_RECEIVERS:
            state.receivers.splice(action.index, 1)
            return {
                ...state
            }
        case MESSAGES.ADD_RECEIVERS:
            return {
                ...state,
                receivers: [
                    ...state.receivers,
                    {
                        phoneNum: "",
                        replacements: [
                            ...state.row.replacements.map(item => {
                                return {
                                    key: item.keyword,
                                    value: item.defaultValue
                                }
                            })
                        ]
                    }
                ]
            }
        case MESSAGES.SELECT_TEMPLATE:
            return {
                ...state,
                ...action.info,
                row: {
                    ...action.data
                },
                receivers: [
                    {
                        phoneNum: "",
                        replacements: [
                            ...action.data.replacements.map(item => {
                                return {
                                    key: item.keyword,
                                    value: item.defaultValue
                                }
                            })
                        ]
                    }
                ]
            }
        case MESSAGES.SEARCH_TEMPLATES:
            return {
                ...state,
                rows: [
                    ...action.rows
                ],
                count: action.rows.length
            }
        case MESSAGES.FETCH_SUCCESS.GET_TEMPLATES:
            return {
                ...state,
                ...action.response
            }
        case MESSAGES.FETCH_FAIL.GET_TEMPLATES:
            return {
                ...state,
                error: action.error
            }
        case MESSAGES.ERROR_RESET:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}