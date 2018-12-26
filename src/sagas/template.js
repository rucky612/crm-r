import axios from 'axios'
import { put, takeEvery, call, all, fork } from 'redux-saga/effects'
import { TEMPLATES } from '../actions/types'
import { history } from '../store'
import errorMessage from './errorMessage'

export const URL = 'http://localhost:8080'
export const version = 'v1'

export function* postTemplateSaga({ template }) {
  const postTemp = checkEmptyString(template)
  try {
    yield call(axios.post, `${URL}/apis/${version}/templates`, postTemp)
    yield put({
      type: TEMPLATES.FETCH_SUCCESS.POST
    })
    yield call(history.push, `/templates/home`)
  } catch (e) {
    yield put({
      type: TEMPLATES.FETCH_FAIL.POST,
      error: errorMessage(e)
    })
  } finally {
    yield put({
      type: TEMPLATES.ERROR_RESET
    })
  }
}

export function checkEmptyString(checkTemplate) {
  const template = {
    ...checkTemplate,
    key: checkTemplate.key.length !== 0 ? checkTemplate.key : Date.parse(new Date().toString()).toString()
  }
  Object.keys(template).forEach(name => {
    if (name === 'error' || name === 'isLoading') {
      delete template[name]
    }
    if (template[name] === '') {
      template[name] = null
    }
  })
  template.replacements.map(item => {
    return Object.keys(item).forEach(name => {
      if (item[name] === '') {
        item[name] = null
      }
    })
  })
  return template
}

export function* getTemplateSaga({ query }) {
  try {
    const res = yield call(axios.get, `${URL}/apis/${version}/templates/${query}`)
    yield put({
      type: TEMPLATES.FETCH_SUCCESS.GET,
      response: res.data
    })
  } catch (e) {
    yield put({
      type: TEMPLATES.FETCH_FAIL.GET,
      error: errorMessage(e)
    })
  } finally {
    yield put({
      type: TEMPLATES.ERROR_RESET
    })
  }
}

export function* getOneTemplateSaga({ query }) {
  try {
    console.log(query)
    const res = yield axios.get(`${URL}/apis/${version}/templates/${query}`)
    yield put({
      type: TEMPLATES.FETCH_SUCCESS.GET_ONE,
      response: res.data.row
    })
  } catch (e) {
    yield put({
      type: TEMPLATES.FETCH_FAIL.GET_ONE,
      error: errorMessage(e)
    })
  } finally {
    yield put({
      type: TEMPLATES.ERROR_RESET
    })
  }
}

export function* putOneTemplateSaga({ id, template }) {
  const req = {
    ...template
  }
  delete req.id
  const putTemp = checkEmptyString(req)
  try {
    yield call(axios.put, `${URL}/apis/${version}/templates/${id}`, putTemp)
    yield call(history.goBack)
  } catch (e) {
    yield put({
      type: TEMPLATES.FETCH_FAIL.PUT,
      error: errorMessage(e)
    })
  } finally {
    yield put({
      type: TEMPLATES.ERROR_RESET
    })
  }
}

export function* removeOneTemplateSaga({ id, query }) {
  try {
    yield call(axios.delete, `${URL}/apis/${version}/templates/${id}`)
    yield call(getTemplateSaga, { query })
  } catch (e) {
    yield put({
      type: TEMPLATES.FETCH_FAIL.DELETE,
      error: errorMessage(e)
    })
  } finally {
    yield put({
      type: TEMPLATES.ERROR_RESET
    })
  }
}

function* watchPostTemplate() {
  yield takeEvery(TEMPLATES.FETCH_REQUEST.POST, postTemplateSaga)
}

function* watchGetTemplate() {
  yield takeEvery(TEMPLATES.FETCH_REQUEST.GET, getTemplateSaga)
}

function* watchGetOneTemplate() {
  yield takeEvery(TEMPLATES.FETCH_REQUEST.GET_ONE, getOneTemplateSaga)
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
    yield fork(watchGetOneTemplate),
    yield fork(watchPutOneTemplate),
    yield fork(watchRemoveOneTemplate)
  ])
}

// for(let i = 1; i < 101; i++) {
//     const repeat = {
//         ...template,
//         key: Number(template.key)+ i,
//         title: `mock${i}`,
//         body: `mock body test${i} :keyword${i}:`,
//         memo: `memo${i}`,
//         replacements: i%2 === 0 ? [
//             {
//                 title: `mock replacement ${i}`,
//                 keyword: `keyword${i}`,
//                 maxByte: i,
//                 defaultValue: `mock replacement 기본값 ${i}`
//             }
//         ] : []
//     }
//     yield axios.post(`${URL}/apis/${version}/templates`, repeat)
// }