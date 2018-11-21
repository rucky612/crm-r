import {TEMPLATES} from './types'

export const fetchRequestPut = (id, template) => ({
    type: TEMPLATES.FETCH_REQUEST.PUT,
    template,
    id
})

export const fetchRequestInitPost = () => ({
    type: TEMPLATES.FETCH_REQUEST.INIT_POST,
})

export const fetchRequestPost = (template) => ({
    type: TEMPLATES.FETCH_REQUEST.POST,
    template
})

export const fetchRequestGet = (query) => ({
    type: TEMPLATES.FETCH_REQUEST.GET,
    query
})

export const fetchRequestGetOne = (query) => ({
  type: TEMPLATES.FETCH_REQUEST.GET_ONE,
  query
})

export const fetchRequestDelete = (id, query) => ({
    type: TEMPLATES.FETCH_REQUEST.DELETE,
    id,
    query
})

export const editTemplate = ({target}) => ({
    type: TEMPLATES.EDIT,
    target
})

export const editReplacement = ({target}, index) => ({
    type: TEMPLATES.EDIT_REPLACEMENT,
    index,
    target
})

export const addReplacement = () => ({
    type: TEMPLATES.ADD_REPLACEMENT,
})

export const removeReplacement = (index) => ({
    type: TEMPLATES.REMOVE_REPLACEMENT,
    index
})

export const resetReplacement = () => ({
    type: TEMPLATES.RESET_REPLACEMENT,
})