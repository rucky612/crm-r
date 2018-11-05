import axios from 'axios'
import {put, takeEvery, call, all, fork} from 'redux-saga/effects'
import {TEMPLATES} from '../actions/types'
import {history} from '../store'
import errorMessage from './errorMessage'

const URL = "http://localhost:8080"
const version = "v1"

