import { TEMPLATES } from '../actions/types'

const initState = {
  authorId: 0,
  key: "",
  title: "",
  body: "",
  memo: "",
  replacements: []
}

export default function(state = initState, action) {
  switch (action.type) {
    case TEMPLATES.POST:
      return action.payload
    default:
      return state
  }
}
