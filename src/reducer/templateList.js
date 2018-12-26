import { TEMPLATES } from '../actions/types'

const initState = {
  rows: [],
  count: 0,
  isLoading: false,
  error: null
}

export default function(state = initState, action) {
  console.log(action.type)
  switch (action.type) {
    case TEMPLATES.ERROR_RESET:
      return {
        ...state,
        error: null
      }
    case TEMPLATES.FETCH_REQUEST.GET:
      return {
        ...state,
        isLoading: true
      }
    case TEMPLATES.FETCH_SUCCESS.GET:
      return {
        ...state,
        ...action.response,
        isLoading: false
      }
    case TEMPLATES.FETCH_FAIL.GET:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        rows: [],
        count: 0
      }
    case TEMPLATES.FETCH_FAIL.DELETE:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state
  }
}
