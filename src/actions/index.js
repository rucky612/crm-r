import { TEMPLATES } from './types'

export const templatesPost = (template) => ({
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

export const fetchReplacements = (input) => ({
  type: TEMPLATES.REPLACEMENTS.REMOVE,
  payload: input
})