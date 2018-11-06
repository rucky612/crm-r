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
        case MESSAGES.ADD_RECEIVERS:
            return {
                ...state,
                receivers: [
                    ...state.receivers,
                    {
                        phoneNum: "",
                        replacements: [
                            {
                                key: "",
                                value: ""
                            },
                            {
                                key: "",
                                value: ""
                            },
                            {
                                key: "",
                                value: ""
                            }
                        ]
                    }
                ]
            }
        case MESSAGES.EDIT:
            return {
                ...state,
                ...action.info,
                row: {
                    ...action.data
                }
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
        default:
            return state;
    }
}