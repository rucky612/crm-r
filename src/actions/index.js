import { TEMPLATES } from './types'

export const fetchTemplate = (payload) => ({
  type: TEMPLATES.FETCH,
  payload
})

export const errorTemplate = (error, message) => ({
  type: TEMPLATES.ERROR,
  error: error
})

export const fixTemplate = (input) => ({
  type: TEMPLATES.FIX,
  input
})

export const postTemplate = (template) => ({
  type: TEMPLATES.POST,
  payload: template
})

export const createReplacement = (replacement) => ({
  type: TEMPLATES.REPLACEMENTS.CREATE,
  payload: replacement
})

export const removeReplacement = (key) => ({
  type: TEMPLATES.REPLACEMENTS.REMOVE,
  payload: key
})

export const resetReplacements = () => ({
  type: TEMPLATES.REPLACEMENTS.RESET
})

export const fixReplacements = (input, index) => ({
  type: TEMPLATES.REPLACEMENTS.FIX,
  input,
  index
})