import axios from 'axios'
import {put, takeEvery, call, all, fork} from 'redux-saga/effects'
import {TEMPLATES} from '../actions/types'
import {history} from '../store'
import errorMessage from './errorMessage'

const URL = "http://localhost:8080"
const version = "v1"

function* postTemplateSaga({template}) {
    const postTemp = checkEmptyString(template)
    try {
        yield call(axios.post, `${URL}/apis/${version}/templates`, postTemp)
        yield put({
            type: TEMPLATES.FETCH_SUCCESS.POST,
        })
        yield call(history.push, `/templates/home`)
    } catch (e) {
        yield put({
            type: TEMPLATES.FETCH_FAIL.POST,
            error: errorMessage(e)
        })
    } finally {
        yield put({
            type: TEMPLATES.ERROR_RESET,
        })
    }
}

function checkEmptyString(checkTemplate) {
    const template = {
        ...checkTemplate,
        key: checkTemplate.key.length !== 0 ? checkTemplate.key : Date.parse(new Date().toString()).toString()
    }
    Object.keys(template).forEach(name => {
        if (name === "error" || name === "isLoading") {
            delete template[name]
        }
        if (template[name] === "") {
            template[name] = null
        }
    })
    template.replacements.map(item => {
        return Object.keys(item).forEach(name => {
            if (item[name] === "") {
                item[name] = null
            }
        })
    })
    return template
}

function* getTemplateSaga({query}) {
    try {
        if (isNaN(query)) {
            const res = yield axios.get(`${URL}/apis/${version}/templates/${query}`)
            yield put({
                type: TEMPLATES.FETCH_SUCCESS.GET,
                response: res.data
            })
        } else {
            const res = yield axios.get(`${URL}/apis/${version}/templates/${query}`)
            yield put({
                type: TEMPLATES.FETCH_SUCCESS.GET_ONE,
                response: res.data.row
            })
        }
    } catch (e) {
        yield put({
            type: TEMPLATES.FETCH_FAIL.GET,
            error: errorMessage(e)
        })
    } finally {
        yield put({
            type: TEMPLATES.ERROR_RESET,
        })
    }
}

function* putOneTemplateSaga({id, template}) {
    const req = {
        ...template
    }
    delete req.id
    const putTemp = checkEmptyString(req)
    try {
        delete template.id
        yield axios.put(`${URL}/apis/${version}/templates/${id}`, putTemp)
        yield call(history.goBack)
    } catch (e) {
        yield put({
            type: TEMPLATES.FETCH_FAIL.PUT,
            error: errorMessage(e)
        })
    } finally {
        yield put({
            type: TEMPLATES.ERROR_RESET,
        })
    }
}

function* removeOneTemplateSaga({id, query}) {
    try {
        yield axios.delete(`${URL}/apis/${version}/templates/${id}`)
        yield call(getTemplateSaga, {query})
    } catch (e) {
        yield put({
            type: TEMPLATES.FETCH_FAIL.DELETE,
            error: errorMessage(e)
        })
    } finally {
        yield put({
            type: TEMPLATES.ERROR_RESET,
        })
    }
}

function* watchPostTemplate() {
    yield takeEvery(TEMPLATES.FETCH_REQUEST.POST, postTemplateSaga)
}

function* watchGetTemplate() {
    yield takeEvery(TEMPLATES.FETCH_REQUEST.GET, getTemplateSaga)
}

function* watchPutOneTemplate() {
    yield takeEvery(TEMPLATES.FETCH_REQUEST.PUT, putOneTemplateSaga)
}

function* watchRemoveOneTemplate() {
    yield takeEvery(TEMPLATES.FETCH_REQUEST.DELETE, removeOneTemplateSaga)
}

export default function* root() {
    yield all([
        yield fork(watchPostTemplate),
        yield fork(watchGetTemplate),
        yield fork(watchPutOneTemplate),
        yield fork(watchRemoveOneTemplate),
    ]);
}

// for(let i = 1; i < 101; i++) {
//     const repeat = {
//         ...template,
//         key: Number(template.key)+ i,
//         title: `mock${i}`,
//         body: `mock body test${i} :keyword${i}:`,
//         memo: `memo${i}`,
//         replacements: [
//             {
//                 title: `mock replacement ${i}`,
//                 keyword: `keyword${i}`,
//                 maxByte: i,
//                 defaultValue: `mock replacement 기본값 ${i}`
//             }
//         ]
//     }
//     yield axios.post(`${URL}/apis/${version}/templates`, repeat)
// }