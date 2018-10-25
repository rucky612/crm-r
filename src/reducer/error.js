import { TEMPLATES } from '../actions/types'

const initState = {
  code: 0,
  message: "",
  response: {
    title: "",
    body: "",
    replacements: []
  }
}

export default function(state = initState, action) {
  switch (action.type) {
    case TEMPLATES.ERROR:
      return action.error

    default:
      return state
  }
}
