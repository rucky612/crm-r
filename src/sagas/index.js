import { spawn, put, takeEvery, call } from 'redux-saga/effects'
import { TEMPLATES } from '../actions/types'
import * as actions from '../actions'

function* validateReplacementSaga({input, index}) {
  switch (input.name) {
    case 'maxByte':
      if(new RegExp(/[^0-9]/g).test(input.value)) {
        yield put(actions.fixReplacements({ name: input.name, value: "" }, index))
        break;
      } else {
        yield put(actions.fixReplacements({ name: input.name, value: Number(input.value)}, index))
        break;
      }
    default:
      yield put(actions.fixReplacements(input, index))
      break;
  }
}

function* validateTemplates({input}) {
  switch (input.name) {
    case 'key':
      if(new RegExp(/[^0-9]/g).test(input.value)) {
        yield put(actions.fixTemplate({ name: input.name, value: "" }))
        break;
      } else {
        yield put(actions.fixTemplate({ name: input.name, value: Number(input.value)}))
        break;
      }
    default:
      yield put(actions.fixTemplate(input))
      break;
  }
}

function* watchFixReplacements() {
  yield takeEvery(TEMPLATES.REPLACEMENTS.VALID, validateReplacementSaga)
}

function* watchFixTemplate() {
  yield takeEvery(TEMPLATES.VALID, validateTemplates)

}

export default function* root() {
  yield spawn(watchFixReplacements)
  yield spawn(watchFixTemplate)
}