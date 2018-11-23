import { MESSAGES } from '../actions/types'

const initState = {
  rows: [],
  row: {},
  count: 0,
  error: null,
  templateKey: '',
  receivers: []
}

export default function(state = initState, action) {
  switch (action.type) {
    case MESSAGES.FETCH_SUCCESS.POST:
      return {
        rows: [],
        row: {},
        count: 0,
        error: null,
        templateKey: '',
        receivers: []
      }
    case MESSAGES.EDIT:
      return {
        ...state,
        receivers: [
          ...state.receivers.slice(0, action.index),
          {
            ...state.receivers[action.index],
            [action.target.name]: action.target.value
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
      const receive = {}
      state.row.replacements.forEach(item => {
        receive[item.keyword] = item.defaultValue ? item.defaultValue : ''
      })
      return {
        ...state,
        receivers: [
          ...state.receivers,
          {
            phoneNum: '',
            ...receive
          }
        ]
      }
    case MESSAGES.SELECT_TEMPLATE:
      const receiver = {}
      action.data.replacements.forEach(item => {
        receiver[item.keyword] = item.defaultValue ? item.defaultValue : ''
      })
      return {
        ...state,
        ...action.info,
        row: {
          ...action.data
        },
        receivers: [
          {
            phoneNum: '',
            ...receiver
          }
        ]
      }
    case MESSAGES.RESET_TEMPLATE:
      return {
        ...state,
        row: {}
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
      return state
  }
}