import { combineReducers } from 'redux'
import templates from './templates'
import createTemplate from './create-template'

export default combineReducers({
  templates,
  createTemplate
})
