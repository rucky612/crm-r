import axios from 'axios'
import {put, takeEvery, call, all, fork} from 'redux-saga/effects'
import {MESSAGES} from '../actions/types'
import {history} from '../store'
import errorMessage from './errorMessage'

const URL = "http://localhost:8080"
const version = "v1"

function* getTemplatesSaga({query}) {
    try {
        const res = yield axios.get(`${URL}/apis/${version}/templates?${query}`)
        yield put({
            type: MESSAGES.FETCH_SUCCESS.GET_TEMPLATES,
            response: res.data
        })
    } catch (e) {
        yield put({
            type: MESSAGES.FETCH_FAIL.GET_TEMPLATES,
            error: errorMessage(e)
        })
        yield put({
            type: MESSAGES.ERROR_RESET,
        })
    }
}

function* getReceiversSaga({id, query}) {
    try {
        const res = yield axios.get(`${URL}/apis/${version}/messages/${id}/receivers?${query}`)
        yield put({
            type: MESSAGES.FETCH_SUCCESS.GET_RECEIVERS,
            response: res.data
        })
    } catch (e) {
        yield put({
            type: MESSAGES.FETCH_FAIL.GET_RECEIVERS,
            error: errorMessage(e)
        })
        yield put({
            type: MESSAGES.ERROR_RESET,
        })
    }
}

function* postMessageSaga({message}) {
    try {
        yield axios.post(`${URL}/apis/${version}/messages`, message)
        yield call(history.push, "/messages/home")
    } catch (e) {
        yield put({
            type: MESSAGES.FETCH_FAIL.GET_TEMPLATES,
            error: errorMessage(e)
        })
        yield put({
            type: MESSAGES.ERROR_RESET,
        })
    }
}

function* getMessageSaga({query}) {
    try {
        const res = yield axios.get(`${URL}/apis/${version}/messages/?${query}`)
        yield put({
            type: MESSAGES.FETCH_SUCCESS.GET,
            response: res.data
        })
    } catch (e) {
        yield put({
            type: MESSAGES.FETCH_FAIL.GET,
            error: errorMessage(e)
        })
        yield put({
            type: MESSAGES.ERROR_RESET,
        })
    }
}

function* deleteMessageSaga({id, query}) {
    try {
        const res = yield axios.delete(`${URL}/apis/${version}/messages/${id}`)
        yield call(getMessageSaga, {query: query.slice(1)})
    } catch (e) {
        yield put({
            type: MESSAGES.FETCH_FAIL.GET,
            error: errorMessage(e)
        })
        yield put({
            type: MESSAGES.ERROR_RESET,
        })
    }
}


function* watchGetTemplates() {
    yield takeEvery(MESSAGES.FETCH_REQUEST.GET_TEMPLATES, getTemplatesSaga)
}

function* watchGetReceivers() {
    yield takeEvery(MESSAGES.FETCH_REQUEST.GET_RECEIVERS, getReceiversSaga)
}

function* watchPostMessage() {
    yield takeEvery(MESSAGES.FETCH_REQUEST.POST, postMessageSaga)
}

function* watchGetMessage() {
    yield takeEvery(MESSAGES.FETCH_REQUEST.GET, getMessageSaga)
}

function* watchDeleteMessage() {
    yield takeEvery(MESSAGES.FETCH_REQUEST.DELETE, deleteMessageSaga)
}

export default function* root() {
    yield all([
        yield fork(watchGetTemplates),
        yield fork(watchPostMessage),
        yield fork(watchGetMessage),
        yield fork(watchGetReceivers),
        yield fork(watchDeleteMessage),
    ])
}

// for(var i = 1; i < 101; i++) {
//     const dummy = {
//         "authorId": i,
//         "templateKey": i,
//         "memo": `memo${i}`,
//         "receivers": [
//             {
//                 "phoneNum": `+82101111${1000 + i}`,
//                 "replacements": i%2 === 0 ? [
//                     {
//                         "key": `keyword${i}`,
//                         "value": `mock replacement 기본값 ${i}`
//                     }
//                 ] : []
//             }
//         ]
//     }
//     yield axios.post(`${URL}/apis/${version}/messages`,dummy)
// }

//
// const mockReceivers = []
// for (var i = 1; i < 101; i++) {
//     mockReceivers.push({
//         phoneNum: "+8210" + (2000 + i) + (1000 + i),
//         replacements: message.receivers[0].replacements
//     })
// }
// message.receivers = mockReceivers
// console.log(message.receivers)