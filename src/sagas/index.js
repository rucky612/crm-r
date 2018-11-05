import {spawn, call} from 'redux-saga/effects'
import templateSaga from './template'

export default function* root() {
    const sagas = [
        templateSaga,
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