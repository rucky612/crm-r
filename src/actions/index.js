import { TEMPLATES } from './types'

export const templatesPost = (template) => ({
  type: TEMPLATES.POST,
  payload: template
})