import {MESSAGES} from './types'

export const fetchGetTemplates = (query) => ({
    type: MESSAGES.FETCH_REQUEST.GET_TEMPLATES,
    query
})

export const editMessages = (info, data) => ({
    type: MESSAGES.EDIT,
    info,
    data
})

export const searchTemplates = (rows) => ({
    type: MESSAGES.SEARCH_TEMPLATES,
    rows
})

export const addReceivers = () => ({
    type: MESSAGES.ADD_RECEIVERS
})