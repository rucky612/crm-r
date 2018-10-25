import { combineReducers } from 'redux'
import templates from './templates'
import createTemplate from './create-template'
import errorHandle from './error'

export default combineReducers({
  templates,
  createTemplate,
  errorHandle
})
