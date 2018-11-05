import { TEMPLATES } from '../actions/types'

const initState = {
  authorId: 0,
  key: '',
  title: '',
  body: '',
  memo: '',
  replacements: [],
}

export default function(state = initState, action) {
  console.log(action.input)
  switch (action.type) {
    case TEMPLATES.FIX:
      return {
        ...state,
        [action.input.name]: action.input.value
      }
    case TEMPLATES.REPLACEMENTS.CREATE:
      return {
        ...state,
        replacements: [
          ...state.replacements,
          {
            ...action.payload
          }
        ]
      }
    case TEMPLATES.REPLACEMENTS.REMOVE:
      state.replacements.splice(action.payload, 1)
      return {
        ...state,
        replacements: [
          ...state.replacements
        ]
      }
    case TEMPLATES.REPLACEMENTS.RESET:
      return {
        ...state,
        replacements: []
      }
    case TEMPLATES.REPLACEMENTS.FIX:
      return {
        ...state,
        replacements: [
          ...state.replacements.slice(0, action.index),
          {
            ...state.replacements[action.index],
            [action.input.name]: action.input.value
          },
          ...state.replacements.slice(action.index + 1, state.replacements.length-1)
        ]
      }
    default:
      return state
  }
}
