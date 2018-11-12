import {MESSAGES} from './types'

export const fetchGetTemplates = (query) => ({
    type: MESSAGES.FETCH_REQUEST.GET_TEMPLATES,
    query
})

export const fetchGetReceivers = (id, query) => ({
    type: MESSAGES.FETCH_REQUEST.GET_RECEIVERS,
    id,
    query
})

export const fetchPostMessage = (message) => ({
    type: MESSAGES.FETCH_REQUEST.POST,
    message
})

export const fetchGetMessages = (query) => ({
    type: MESSAGES.FETCH_REQUEST.GET,
    query
})

export const fetchDelteMessages = (id, query) => ({
    type: MESSAGES.FETCH_REQUEST.DELETE,
    id,
    query
})

export const selectTemplate = (info, data) => ({
    type: MESSAGES.SELECT_TEMPLATE,
    info,
    data
})

export const resetTemplate = () => ({
    type: MESSAGES.RESET_TEMPLATE,
})

export const searchTemplates = (rows) => ({
    type: MESSAGES.SEARCH_TEMPLATES,
    rows
})

export const addReceivers = () => ({
    type: MESSAGES.ADD_RECEIVERS
})

export const removeReceivers = (index) => ({
    type: MESSAGES.REOMVE_RECEIVERS,
    index
})

export const editReceiver = (target, index) => ({
    type: MESSAGES.EDIT,
    target,
    index
})

export const errorReset = () => ({
    type: MESSAGES.ERROR_RESET
})