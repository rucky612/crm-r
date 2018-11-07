import {MESSAGES} from './types'

export const fetchGetTemplates = (query) => ({
    type: MESSAGES.FETCH_REQUEST.GET_TEMPLATES,
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

export const fetchGetReceivers = (id, query) => ({
    type: MESSAGES.FETCH_REQUEST.GET_RECEIVERS,
    id,
    query
})

export const selectTemplate = (info, data) => ({
    type: MESSAGES.SELECT_TEMPLATE,
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

export const removeReceivers = (index) => ({
    type: MESSAGES.REOMVE_RECEIVERS,
    index
})

export const editReceiverPhone = (phoneNum, index) => ({
    type: MESSAGES.EDIT_PHONENUM,
    phoneNum,
    index
})