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
    } finally {
        yield put({
            type: MESSAGES.ERROR_RESET,
        })
    }
}

function* postMessageSaga({message}) {
    try {
        yield axios.post(`${URL}/apis/${version}/messages`,message)
        yield call(history.push, "/messages/home")
    } catch (e) {
        yield put({
            type: MESSAGES.FETCH_FAIL.GET_TEMPLATES,
            error: errorMessage(e)
        })
    } finally {
        yield put({
            type: MESSAGES.ERROR_RESET,
        })
    }
}

function* watchGetTemplates() {
    yield takeEvery(MESSAGES.FETCH_REQUEST.GET_TEMPLATES, getTemplatesSaga)
}

function* watchPostMessage() {
    yield takeEvery(MESSAGES.FETCH_REQUEST.POST, postMessageSaga)
}

export default function* root() {
    yield all([
        yield fork(watchGetTemplates),
        yield fork(watchPostMessage)
    ])
}