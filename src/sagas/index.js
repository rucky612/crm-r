import {spawn, call} from 'redux-saga/effects'
import templateSaga from './template'
import messagesSaga from './messages'

export default function* root() {
    const sagas = [
        templateSaga,
        messagesSaga
    ];

    yield sagas.map(saga =>
        spawn(function* () {
            while (true) {
                try {
                    yield call(saga)
                } catch (e) {
                    console.log({e})
                }
            }
        })
    )
}