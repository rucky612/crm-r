import axios from 'axios'
import { spawn, put, takeEvery, call } from 'redux-saga/effects'
import { TEMPLATES } from '../actions/types'
import * as actions from '../actions'
import templateValidate from '../utils/validate'

const URL = "http://localhost:8080"
const version = "v1"

function* postTemplateSaga({payload}) {
  const template = yield call(checkEmptyString, payload)
  const { finalPass, errorData } = yield call(templateValidate, template)
  console.log(finalPass, errorData)
  if (finalPass) {
    try {
      yield axios.post(`${URL}/apis/${version}/templates`, template)
      yield put(actions.errorTemplate({ code: 0, response: {}, message: "" }))
    } catch (e) {
      console.log({e})
      yield call(postErrorSaga, e)
    }
  } else {
    yield put(actions.errorTemplate({ code: 999, response: errorData, message: "양식에 맞게 다시 작성해주세요." }))
  }
}

function checkEmptyString(checkTemplate) {
  const template = {
    ...checkTemplate,
    key: Date.parse(new Date().toString()).toString()
  }
  Object.keys(template).forEach(name => {
    if(template[name] === "") {
      template[name] = null
    }
  })
  Object.keys(template.replacements).forEach(item => {
    Object.keys(item).forEach(name => {
      if(item[name] === "") {
        item[name] = null
      }
    })
  })
  return template
}

function* postErrorSaga(error) {
  if(error.response === undefined) {
    const errorNetwork = {
      code: 444,
      message: "네트워크 에러입니다. 연결을 확인해주세요"
    }
    yield put(actions.errorTemplate(errorNetwork))
    return;
  }
  function errorMessage(code) {
    switch (code) {
      case 400:
        return "양식을 다시 확인해주세요."
      case 409:
        return "키값이 중복됩니다."
      case 500:
        return "서버가 불안정하니 다시 시도해주세요"
      default:
        return "에러 핸들링 필요"
    }
  }
  const errorData = {
    code: error.response.status,
    message: errorMessage(error.response.status)
  }
  yield put(actions.errorTemplate(errorData))
}

function* watchPostTemplate() {
  yield takeEvery(TEMPLATES.POST, postTemplateSaga)
}

export default function* root() {
  yield spawn(watchPostTemplate)
}